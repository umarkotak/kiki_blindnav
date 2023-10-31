'use client'

// import dynamic from 'next/dynamic'
import { useState, useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
// const { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } = dynamic(() => import('react-leaflet'), {ssr: false})

export default function HomeMap() {
  const [clickedPositions, setClickedPositions] = useState([]);
  const [currentLocation, setCurrentLocation] = useState([-0.11405174352366838, 109.36435626886076]);

  const animateRef = useRef(false)

  const [onClient, setOnClient] = useState(false)

  useEffect(() => {
    getCurrLOcation()
    if (window) { setOnClient(true) }
  }, []);

  function getCurrLOcation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation([latitude, longitude]);
        console.log("moved", latitude, longitude)
      },
      (error) => {
        console.error('Error getting current location:', error);
      }
    );
  }

  const handleClick = (e) => {
    const { lat, lng } = e.latlng;
    console.log(`Latitude: ${lat}, Longitude: ${lng}`);
    setClickedPositions([...clickedPositions, { lat, lng }]);

    // Send data to your server
    sendDataToServer(lat, lng, "testaaa");
  };

  function MyClickEvents() {
    const map = useMapEvents({
      click: handleClick,
    });

    return null;
  }

  const sendDataToServer = (latitude, longitude, polyline) => {
    fetch('https://api.shadow-animapu-1.site/server/sri/location/current', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        latitude,
        longitude,
        polyline,
      }),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  };

  const RecenterAutomatically = (center) => {
    if (center.length !== 2) { return }
    const map = useMap();
     useEffect(() => {
       map.setView(center);
     }, center);
     return null;
   }

   function SetViewOnClick({ animateRef }) {

    const map = useMapEvents('click', (e) => {
      map.setView(e.latlng, map.getZoom(), {
        animate: animateRef.current || false,
      })
    })

    console.log("CLICKED")
    return null
  }

  return (
    <main className="flex min-h-screen flex-col">
      <div className='flex flex-col'>
        <div className='h-full w-full ovefrlow-hidden border border-white rounded-lg bg-gray-300'>
          {onClient && <MapContainer center={currentLocation} zoom={13} style={{ height: '500px', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {clickedPositions.map((position, index) => (
              <Marker key={index} position={position}>
                <Popup>
                  A marker at Lat: {position.lat}, Lng: {position.lng}
                </Popup>
              </Marker>
            ))}
            {/* <MyClickEvents /> */}
            <RecenterAutomatically center={currentLocation} />
            <SetViewOnClick animateRef={animateRef} />
          </MapContainer>}
        </div>
        <div>
          <button onClick={()=> getCurrLOcation()}>move to current location</button>
          <p>
            <label>
              <input
                type="checkbox"
                onChange={() => {
                  animateRef.current = !animateRef.current
                }}
              />
              Animate panning
            </label>
          </p>
        </div>
      </div>
    </main>
  )
}
