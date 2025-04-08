import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
} from "react";

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
  const defaultUseLocation = useMemo(() => {
    return typeof localStorage !== "undefined"
      ? localStorage.getItem("useLocation") === "true"
      : false;
  }, []);
  const setDefaultUseLocationToLocalStorage = (useLocation: boolean) => {
    localStorage.setItem("useLocation", useLocation.toString());
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      warningCallback();
    }
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        timestamp: position.timestamp,
      });
      localStorage.setItem("location", JSON.stringify({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        timestamp: position.timestamp,
      }));
    });
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
