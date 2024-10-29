function getRandomInRange(from, to, fixed) {

    //declaring a variable to hold random coordinates
    const randomCoordinates = (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number

    //After we return the random coordinates
    return randomCoordinates
}

async function createMap() {


    //below creates map var and has Longtitude, Latitude values 
    //Question: How to use .setView() to grab longtitude + latitude values from getRandomIntegers?
    var map = L.map('map').setView([39.283, -98.5795], 3.5);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 16,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);


    // Generates 3 sets of different random coordinates
    const longitude1 = getRandomInRange(30, 35, 3)
    const latitude1 = getRandomInRange(-90, -100, 3)

    const longitude2 = getRandomInRange(30, 35, 3)
    const latitude2 = getRandomInRange(-90, -100, 3)

    const longitude3 = getRandomInRange(30, 35, 3)
    const latitude3 = getRandomInRange(-90, -100, 3)


    //adding a marker (maybe try to add a for loop)
    var marker = L.marker([longitude1, latitude1]).addTo(map);
    var marker = L.marker([longitude2, latitude2]).addTo(map);
    var marker = L.marker([longitude3, latitude3]).addTo(map);

    //Now finding a way to call getMarkerData 3 times (for each long/lat set)

    //use await anytime you need to call a async function
    var locality1 = await getMarkerData(longitude1, latitude1);
    var locality2 = await getMarkerData(longitude2, latitude2);
    var locality3 = await getMarkerData(longitude3, latitude3);

    console.log(locality1);
    console.log(locality2);
    console.log(locality3);


    //grabbing text values for Marker 1, Marker 2, Marker 3
    document.getElementById('marker1').textContent += `Longtitude: ${longitude1} Latitude: ${latitude1}`;
    document.getElementById('marker2').textContent += `Longtitude: ${longitude2} Latitude: ${latitude2}`;
    document.getElementById('marker3').textContent += `Longtitude: ${longitude3} Latitude: ${latitude3}`;

    //Grabbing text values for Locality 1, 2, 3:
    document.getElementById('locality1').textContent += `${locality1}`;
    document.getElementById('locality2').textContent += `${locality2}`;
    document.getElementById('locality3').textContent += `${locality3}`;


}



//now using longitude + latitude, pass two parameters for longitude and latitude values
async function getMarkerData(latitudeValue, longitudeValue) {

    //after the ?, the api requires two values: latitude and longitude
    // we need the inputs from the latitude and longitude, so use ` ` 
    const markerData = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitudeValue}&longitude=${longitudeValue}&localityLanguage=en`)
        .then((res) =>
            res.json()).then((res) => res.locality);

    // after doing the first .then((res)) => res.json()): res is the JSON object 
    //.then((res) => res.locality); is what we do with the actual object 


    //doing res.locality grabs the data

    // Debugging to check code:
    console.log(markerData)

    return markerData;

}





window.onload = createMap;
