import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import Modal from "react-modal";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Popup from "reactjs-popup";
import { Typography } from "@mui/material";
import { Button } from "../ui/button";

const mapContainerStyle = {
  width: "100%",
  height: "510px",
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
    <Popup
      isOpen={showModal}
      onRequestClose={() => setShowModal(false)}
      ariaHideApp={false}
      trigger={<Button onClick={() => setShowModal(true)}>Show Markers</Button>}
      modal
      nested
      overlayStyle={{
        backgroundColor: "rgba(0, 0, 0, 0.6)",
      }}
    >
      <div className="bg-white w-[70rem] h-[40rem] dark:bg-dark-popup rounded-md">
        <div className="flex justify-end pt-2 px-2">
          <IoIosCloseCircleOutline
            size={25}
            className="cursor-pointer hover:text-purple-500 hover:scale-110"
            aria-label="Close"
            onClick={() => setShowModal(false)}
          />
        </div>
        <div className="flex flex-col items-center p-5">
          <Typography variant="h5">Home Visit Locations</Typography>
          {/* <button onClick={() => setShowModal(false)}>Close</button> */}
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
        </div>
      </div>
    </Popup>
  );
};

export default MarkersPopup;
