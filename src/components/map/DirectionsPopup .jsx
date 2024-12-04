import { useState } from "react";
import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
  useLoadScript,
} from "@react-google-maps/api";
import Modal from "react-modal";
import Popup from "reactjs-popup";
import { Button } from "../ui/button";

const mapContainerStyle = {
  width: "100%",
  height: "510px",
};

const DirectionsPopup = ({ endpoints }) => {
  const [showModal, setShowModal] = useState(false);
  const [directions, setDirections] = useState(null);
  const [currentLocation, setCurrentLocation] = useState({
    lat: 6.9074944,
    lng: 79.8621696,
  });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
  });

  const calculateRoute = () => {
    if (!currentLocation) {
      alert("Unable to determine your current location.");
      return;
    }

    const pendingVisits = endpoints.filter((visit) => visit.type == "PENDING");

    const waypoints = pendingVisits.slice(0, -1).map((point) => ({
      location: { lat: point.lat, lng: point.lng },
      stopover: true,
    }));

    // The final destination is the last point in the array
    const destination = endpoints[endpoints.length - 1];

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: currentLocation,
        destination: { lat: destination.lat, lng: destination.lng },
        waypoints: waypoints,
        optimizeWaypoints: true, // Optimize the route for efficiency
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
          calculateRoute();
          setShowModal(true);
        },
        (error) => {
          console.error("Error getting current location:", error);
          alert("Unable to fetch current location.");
        }
      );
    } else {
      calculateRoute();
      setShowModal(true);
    }
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
          <Typography variant="h5">
            Direction To Home Visit Locations
          </Typography>
          <button onClick={() => setShowModal(false)}>Close</button>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={currentLocation || { lat: 0, lng: 0 }} // Center on current location or default
            zoom={7}
          >
            {directions && <DirectionsRenderer directions={directions} />}
          </GoogleMap>
        </div>
      </div>
    </Popup>
  );
};

export default DirectionsPopup;
