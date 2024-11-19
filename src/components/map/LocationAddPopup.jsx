import { TextareaAutosize, Typography } from "@mui/material";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Popup from "reactjs-popup";
import LocationPicker from "./LocationPicker";
import { useState } from "react";
import { Button } from "../ui/button";

const LocationAddPopup = ({ setFormObject, formObject }) => {
  const [address, setAddress] = useState(formObject.address);
  const [location, setLocation] = useState(
    formObject.location ? JSON.parse(formObject.location) : null
  );

  return (
    <Popup
      trigger={
        <div className="flex col-start-2 col-span-2 w-full justify-center items-center bg-gray-300 px-5 py-2 h-full rounded-sm hover:bg-gray-400">
          Pick location on the map
        </div>
      }
      modal
      nested
      overlayStyle={{
        backgroundColor: "rgba(0, 0, 0, 0.6)",
      }}
    >
      {(close) => (
        <div className="rounded-md bg-white dark:bg-dark-popup w-[1000px] h-[600px]">
          <div className="flex flex-row-reverse justify-between pt-5 px-5">
            <IoIosCloseCircleOutline
              size={25}
              className="cursor-pointer hover:text-purple-500 hover:scale-110"
              aria-label="Close"
              onClick={close}
            />
          </div>
          <div className="flex h-[520px] w-full px-5">
            <div className="w-8/12">
              <LocationPicker
                setAddress={setAddress}
                location={location}
                setLocation={setLocation}
              />
            </div>
            <div className="w-4/12">
              <Typography variant="h5">Home Address</Typography>
              <TextareaAutosize
                minRows={3}
                className="w-80 my-5 rounded-lg shadow-md shadow-slate-100 dark:shadow-slate-900 focus:shadow-outline-purple dark:focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-gray-500 dark:hover:border-gray-500 focus:border-gray-500 dark:focus:border-gray-500 dark:border-slate-600 bg-white dark:bg-slate-900  focus-visible:outline-0 box-border"
                placeholder=""
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <Button
                onClick={() => {
                  setFormObject({
                    ...formObject,
                    address,
                    location: JSON.stringify(location),
                  });
                  close();
                }}
              >
                Save
              </Button>
              <Typography>
                For the midwife home visits, she will arrive at the above
                location marked by the pin. Please relocate the pin if it's at
                the incorrect location
              </Typography>
            </div>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default LocationAddPopup;
