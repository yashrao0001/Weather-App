import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "./MapComponent.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const MapComponent = ({ latitude, longitude }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null); // Store map instance

  useEffect(() => {
    if (!mapRef.current) {
      // Create map only once
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [longitude, latitude],
        zoom: 10,
      });

      new mapboxgl.Marker()
        .setLngLat([longitude, latitude])
        .addTo(mapRef.current);
    } else {
      // Smooth transition to new location
      mapRef.current.flyTo({
        center: [longitude, latitude],
        zoom: 10,
        speed: 1.5,
        curve: 1.2,
        essential: true,
      });
    }
  }, [latitude, longitude]);

  return <div ref={mapContainerRef} className="mapbox" />;
};

export default MapComponent;
