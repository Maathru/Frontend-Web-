import { useState, useEffect } from "react";
import {
  APIProvider,
  Map,
  Marker,
  useMarkerRef,
} from "@vis.gl/react-google-maps";

const LocationPicker = ({ setAddress, location, setLocation }) => {
  const [markerRef, marker] = useMarkerRef();

  useEffect(() => {
    if (location) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error("Error getting current location:", error);
        // Fallback to a default location if unable to get current location
        setLocation({ lat: 6.901323, lng: 79.860731 });
      }
    );
  }, []);

  useEffect(() => {
    if (!location) return;

    const fetchAddress = async (lat, lng) => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.GOOGLE_MAPS_API_KEY}`
        );
        const data = await response.json();
        const formattedAddress = data.results[0].formatted_address;
        setAddress(formattedAddress);
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    };

    fetchAddress(location.lat, location.lng);
  }, [location]);

  const handleMapClick = (e) => {
    const lat = e.detail.latLng.lat;
    const lng = e.detail.latLng.lng;

    if (marker) {
      marker.setPosition({ lat, lng });
    }

    setLocation({ lat, lng });
  };

  return (
    <>
      <APIProvider apiKey={process.env.GOOGLE_MAPS_API_KEY}>
        <Map defaultZoom={15} defaultCenter={location} onClick={handleMapClick}>
          <Marker ref={markerRef} position={location} />
        </Map>
      </APIProvider>
    </>
  );
};

export default LocationPicker;
