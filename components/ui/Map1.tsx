'use client'
import React, { useRef, useEffect, useState } from 'react';
import "leaflet/dist/leaflet.css";

import L from "leaflet";

import styles from './map.module.css';

import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";

const Map1 = () => {
  const mapContainer = useRef<HTMLDivElement>(null); // Specify the type of ref
  const map = useRef<L.Map | null>(null); // Adjust the type here
  const center = { lng: 16.27265877959906, lat:  80.43773592584246 };
  const [zoom] = useState(12);

  useEffect(() => {
    if (map.current || !mapContainer.current) return; // Stop initialization if map is already created or mapContainer is null

    map.current = new L.Map(mapContainer.current, { // Ensure mapContainer.current is not null
      center: L.latLng(center.lat, center.lng),
      zoom: zoom
    });

    // Create a MapTiler Layer inside Leaflet
    const mtLayer = new MaptilerLayer({
      // Get your free API key at https://cloud.maptiler.com
      apiKey: "4sgU0MLweYDvUW9b9CP1",
    }).addTo(map.current!); // Add ! to assert that map.current is not null

  }, [center.lng, center.lat, zoom]);

  return (
    <div className={styles.mapWrap}>
      <div ref={mapContainer} className={styles.map}/>
    </div>
  )
}

export default Map1;
