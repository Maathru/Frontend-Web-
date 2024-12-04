import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import Modal from "react-modal";

const mapContainerStyle = {
  width: "400px",
  height: "400px",
};

const colorIcons = {
  PENDING: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
  COMPLETED: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
};

const MarkersPopup = ({ markers }) => {
  const [showModal, setShowModal] = useState(false);
  const mapRef = useRef(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
  });

  const fitMapToBounds = (map, locations) => {
    if (locations.length === 0) return;
    const bounds = new window.google.maps.LatLngBounds();
    locations.forEach((loc) => {
      bounds.extend({ lat: loc.lat, lng: loc.lng });
    });
    map.fitBounds(bounds);
  };

  const handleMapLoad = (map) => {
    mapRef.current = map;
    fitMapToBounds(map, markers);
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Show Markers</button>

      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        ariaHideApp={false}
      >
        <h2>Multiple Markers</h2>
        <button onClick={() => setShowModal(false)}>Close</button>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          onLoad={handleMapLoad}
          zoom={10} 
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={{ lat: marker.lat, lng: marker.lng }}
              icon={colorIcons[marker.type]}
            />
          ))}
        </GoogleMap>
      </Modal>
    </div>
  );
};

export default MarkersPopup;
