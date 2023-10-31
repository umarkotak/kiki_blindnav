'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect, useRef } from 'react'
// import HomeMap from './home_map';
// import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
// const { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } = dynamic(() => import('react-leaflet'), {ssr: false})
// const { HomeMap } = dynamic(() => import('./home_map'), {ssr: false})
const HomeMap = dynamic(() => import('../components/home_map'), {ssr: false})

export default function Home() {
  return (
    <main className="">
      <HomeMap />
    </main>
  )
}
