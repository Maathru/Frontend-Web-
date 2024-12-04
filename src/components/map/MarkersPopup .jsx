import React, { useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import Modal from "react-modal";

const mapContainerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: 6.8509906,
  lng: 79.9267308,
};

const colorIcons = {
  red: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
  blue: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
};

const MarkersPopup = ({ markers }) => {
  const [showModal, setShowModal] = useState(false);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
  });

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
          center={center}
          zoom={8}
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
