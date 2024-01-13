import React, { useRef, useEffect, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import "./map.css";

const jsonData = [
  {
    Latitude: 67.1114346,
    Longitude: 24.9330654,
    Altitude: 0,
    MagX: -30.883,
    MagY: -6.821,
    MagZ: -36.955,
    NetField: 48.641,
    TimeStamp: "06/22/2023 15:54:57",
  },
  {
    Latitude: 24.8607,
    Longitude: 67.0099,
    Altitude: 0,
    MagX: -25.432,
    MagY: -8.765,
    MagZ: -33.123,
    NetField: 49.123,
    TimeStamp: "06/22/2023 16:30:00",
  },
  {
    Latitude: 31.5204,
    Longitude: 74.3587,
    Altitude: 0,
    MagX: -28.765,
    MagY: -5.432,
    MagZ: -35.678,
    NetField: 47.891,
    TimeStamp: "06/22/2023 16:45:00",
  },
  
  // Add more data points as needed
];
// ... (other imports and styles)

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [zoom] = useState(14);
  maptilersdk.config.apiKey = "cZBCWk66kJmSM1hT9fSd";

  useEffect(() => {
    if (map.current) return; // stops map from initializing more than once

    // Calculate the bounding box of all data points
    const bounds = new maptilersdk.LngLatBounds();
    jsonData.forEach((dataPoint) => {
      bounds.extend([dataPoint.Longitude, dataPoint.Latitude]);
    });

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: bounds.getCenter().toArray(),
      zoom: zoom,
    });

    // Add markers for each data point
    jsonData.forEach((dataPoint) => {
      const { Longitude, Latitude, MagX, MagY, MagZ, NetField, TimeStamp } = dataPoint;

      // Create a marker with a popup
      const marker = new maptilersdk.Marker({ color: "#FF0000" })
        .setLngLat([Longitude, Latitude])
        .addTo(map.current);

      // Create a popup with MagX, MagY, MagZ, NetField, and TimeStamp information
      const popupContent = `<div>
                              <p>MagX: ${MagX}</p>
                              <p>MagY: ${MagY}</p>
                              <p>MagZ: ${MagZ}</p>
                              <p>NetField: ${NetField}</p>
                              <p>TimeStamp: ${TimeStamp}</p>
                            </div>`;

      const popup = new maptilersdk.Popup({ offset: 25 }).setHTML(popupContent);

      // Attach the popup to the marker
      marker.setPopup(popup);

      // Show the popup on marker hover
      marker.on("mouseenter", () => {
        marker.togglePopup();
      });

      // Hide the popup on marker leave
      marker.on("mouseleave", () => {
        marker.togglePopup();
      });
    });
  }, [jsonData, zoom]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}
