import React, { createContext, useState, useEffect, useContext } from "react";

export const LocationContext = createContext<{
  location: {
    latitude: number;
    longitude: number;
    timestamp: number;
  } | null;
  getLocation: () => void;
  defaultUseLocation: boolean;
  setDefaultUseLocationToLocalStorage: (useLocation: boolean) => void;
}>({
  location: null,
  getLocation: () => {},
  defaultUseLocation: false,
  setDefaultUseLocationToLocalStorage: () => {},
});

export const useLocation = () => {
  return useContext(LocationContext);
};

const LocationProvider = ({
  children,
  warningCallback,
}: {
  children: React.ReactNode;
  warningCallback: () => void;
}) => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
    timestamp: number;
  } | null>(null);
  const defaultUseLocation = typeof localStorage !== "undefined"
    ? localStorage.getItem("useLocation") === "true"
    : false;
  const setDefaultUseLocationToLocalStorage = (useLocation: boolean) => {
    localStorage.setItem("useLocation", useLocation.toString());
  };
  // const [useLocation, setUseLocation] = useState(defaultUseLocation);

  const getLocation = () => {
    if (navigator.geolocation && !location) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          timestamp: position.timestamp,
        });
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
      warningCallback();
    }
  };
  useEffect(() => {
    if (defaultUseLocation) {
      getLocation();
    }
  }, []);

  return (
    <LocationContext.Provider
      value={{
        location,
        getLocation,
        defaultUseLocation,
        setDefaultUseLocationToLocalStorage,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export default LocationProvider;
