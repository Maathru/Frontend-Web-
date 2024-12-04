import { useState } from "react";
import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
  useLoadScript,
} from "@react-google-maps/api";
import Modal from "react-modal";

const mapContainerStyle = {
  width: "400px",
  height: "400px",
};

const DirectionsPopup = ({ endpoint }) => {
  const [showModal, setShowModal] = useState(false);
  const [directions, setDirections] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
  });

  const calculateRoute = () => {
    if (!currentLocation) {
      alert("Unable to determine your current location.");
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: currentLocation,
        destination: endpoint,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK") {
          setDirections(result);
        } else {
          alert("Directions request failed due to " + status);
        }
      }
    );
  };

  const handleButtonClick = () => {
    if (!currentLocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
          calculateRoute({ lat: latitude, lng: longitude });
          setShowModal(true);
        },
        (error) => {
          console.error("Error getting current location:", error);
          // Fallback to a default location if unable to get current location
          setCurrentLocation({ lat: 6.901323, lng: 79.860731 });
        }
      );
    } else {
      calculateRoute(currentLocation);
      setShowModal(true);
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <button onClick={handleButtonClick}>Get Directions</button>

      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        ariaHideApp={false}
      >
        <h2>Directions</h2>
        <button onClick={() => setShowModal(false)}>Close</button>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={endpoint}
          zoom={7}
        >
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </Modal>
    </div>
  );
};

export default DirectionsPopup;
