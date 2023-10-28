'use client'

import { useState, useEffect } from 'react'
import GoogleMapReact from 'google-map-react'

const AnyReactComponent = ({ text }) => <div>{text}</div>

export default function Home() {
  const [centerMap, setCenterMap] = useState({
    lat: 10.99835602,
    lng: 77.01502627
  })

  useEffect(()=>{
    // findMe()
  }, [])

  function findMe() {
    var tmpCenterMap = {}
    navigator.geolocation.getCurrentPosition(({coords: {latitude: lat, longitude: lng}}) => {
      tmpCenterMap = {
        lat: lat,
        lng: lng
      }
      console.log("from", centerMap, "my position", tmpCenterMap)
      setCenterMap(tmpCenterMap)
    })
  }

  return (
    <main className="flex min-h-screen flex-col">
      <div className='flex'>
        <div className='h-[800px] w-3/4'>
          <GoogleMapReact
            bootstrapURLKeys={{ key: "" }}
            center={centerMap}
            defaultZoom={10}
            yesIWantToUseGoogleMapApiInternals={true}
            key={""}
          >
            <AnyReactComponent
              // lat={centerMap.lat}
              // lng={centerMap.lng}
              text="My Marker"
            />
          </GoogleMapReact>
        </div>
        <div className='p-4'>
          <button className='p-2 bg-white hover:bg-gray-200 text-black rounded-lg' onClick={()=>findMe()}>Find Me!</button>
        </div>
      </div>
    </main>
  )
}
