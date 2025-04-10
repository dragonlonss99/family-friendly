import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { getClassification, getFriendlyContent } from "@/util/api";
import { getProductNameList } from "@/util/productInfoUtil";

export const ProductInfoListContext = createContext<{
  productInfoList: {
    address: string;
    areaCode: string | null;
    city: string | null;
    distance: number;
    info: any[];
    latitude: number;
    longitude: number;
    name: string;
    oldPKey: string;
    periodType: number;
    post: string | null;
    tel: string;
    updateDate: string;
  }[];
  getFriendlyContentList: any;
  classification: any[];
  treeSelectValue: any[];
  treeItemClick: (newValue: string[]) => void;
  location: {
    latitude: number;
    longitude: number;
    timestamp: number;
  } | null;
  getLocation: () => void;
}>({
  productInfoList: [],
  getFriendlyContentList: () => Promise.resolve(),
  classification: [],
  treeSelectValue: [],
  treeItemClick: () => {},
  location: null,
  getLocation: () => {},
});

export const useProductInfoList = () => {
  return useContext(ProductInfoListContext);
};

const ProductInfoListProvider = ({
  children,
  warningCallback,
}: {
  children: React.ReactNode;
  warningCallback: () => void;
}) => {
  const [productInfoList, setProductInfoList] = useState<
    {
      address: string;
      areaCode: string | null;
      city: string | null;
      distance: number;
      info: any[];
      latitude: number;
      longitude: number;
      name: string;
      oldPKey: string;
      periodType: number;
      post: string | null;
      tel: string;
      updateDate: string;
    }[]
  >([]);
  const [classification, setClassification] = useState([]);
  const defaultProductTreeSelect =
    typeof localStorage !== "undefined"
      ? JSON.parse(localStorage.getItem("productTreeSelect") || "[]")
      : [];

  const [treeSelectValue, setTreeSelectValue] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const isInitialized = useRef<boolean>(false);

  const getFriendlyContentList = useCallback(
    async ({
      postCode = "",
      latitude = 0,
      longitude = 0,
    }: {
      postCode?: string;
      latitude?: number;
      longitude?: number;
    }) => {
      if (isLoading) return;
      setIsLoading(true);
      try {
        const res = await getFriendlyContent(postCode, latitude, longitude);
        setProductInfoList(res);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading]
  );

  const getClassificationList = useCallback(async () => {
    await getClassification().then((res: any) => {
      setClassification(res);
      const productNameList = getProductNameList(res);
      const defaultSelect = defaultProductTreeSelect.filter(
        (productCode: any) =>
          productNameList.some((product: any) => product.code === productCode)
      );
      setTreeSelectValue(defaultSelect);
    });
  }, [defaultProductTreeSelect]);

  const treeItemClick = (newValue: string[]) => {
    setTreeSelectValue(newValue);
    localStorage.setItem("productTreeSelect", JSON.stringify(newValue));
  };

  // location
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
    timestamp: number;
  } | null>(null);

  const getLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      warningCallback();
      return null;
    }

    return new Promise<{
      latitude: number;
      longitude: number;
      timestamp: number;
    } | null>((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            timestamp: position.timestamp,
          };
          setLocation(newLocation);
          localStorage.setItem("location", JSON.stringify(newLocation));
          resolve(newLocation);
        },
        (error) => {
          console.error("Error getting location:", error);
          warningCallback();
          resolve(null);
        }
      );
    });
  }, [warningCallback]);

  const initializeData = async () => {
    if (isInitialized.current) return;

    try {
      const locationData = await getLocation();
      await getClassificationList();

      await getFriendlyContentList({
        postCode: "",
        latitude: locationData?.latitude || 0,
        longitude: locationData?.longitude || 0,
      });

      isInitialized.current = true;
    } catch (error) {
      console.error("Error initializing data:", error);
    }
  };

  useEffect(() => {
    initializeData();
  }, []);

  return (
    <ProductInfoListContext.Provider
      value={{
        productInfoList,
        getFriendlyContentList,
        classification,
        treeSelectValue,
        treeItemClick,
        location,
        getLocation,
      }}
    >
      {children}
    </ProductInfoListContext.Provider>
  );
};

export default ProductInfoListProvider;
