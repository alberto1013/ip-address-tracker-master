const tilesProvider ="https://{s}.tile.openstreetmap.org/${z}/${x}/${y}.png";
let input = document.querySelector('#search');

const fetchData = async (ip)=>{
    let api =`https://geo.ipify.org/api/v1?apiKey=at_ZPT3kkpLdJ3voSeD5eXDoRMjMwlug&ipAddress=${ip}` ;
    let response = await fetch(api);
    let data = await response.json()
    let {lat,lng,country,city,timezone}= data.location
    document.querySelector('.ip-add').innerText = data.ip
    document.querySelector('.location').innerText = `${country} - ${city}`
    document.querySelector('.time').innerText = (data.as)? `${data.as.name} ${timezone}`:`${timezone}`
    document.querySelector('.isp').innerText = data.isp
    drawMap(lat,lng);
}

input.addEventListener('keydown',(e)=>{
    var keycode = (e.keyCode ? e.keyCode : e.which);
    if(keycode == '13'){
        try {
            fetchData(e.target.value);
            e.target.value = ''
        e.preventDefault(); 
        } catch (error) {
            console.log(error);
        }
    }
});
const drawMap = (lat,lng)=>{
    var container = L.DomUtil.get('mapid');
if(container != null){
container._leaflet_id = null;
}
    var mymap = L.map('mapid').setView([lat, lng], 13);

	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1
    }).addTo(mymap);
    var greenIcon = L.icon({
        iconUrl: 'images/icon-location.svg',
    
        iconSize:     [38, 38], // size of the icon
        shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, 1] // point from which the popup should open relative to the iconAnchor
    });
    L.marker([lat, lng], {icon: greenIcon}).addTo(mymap)
    
}