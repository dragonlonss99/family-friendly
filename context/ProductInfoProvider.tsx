import React, { createContext, useState, useContext, useEffect } from "react";
import { getClassification, getFriendlyContent } from "@/util/api";
import { getProductNameList } from "@/util/productInfoUtil";
import { useLocation } from "@/context/LocationProvider";
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
}>({
  productInfoList: [],
  getFriendlyContentList: () => Promise.resolve(),
  classification: [],
  treeSelectValue: [],
  treeItemClick: () => {},
});

export const useProductInfoList = () => {
  return useContext(ProductInfoListContext);
};

const ProductInfoListProvider = ({
  children,
}: {
  children: React.ReactNode;
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
  const { defaultUseLocation, location } = useLocation();
  const defaultProductTreeSelect =
    typeof localStorage !== "undefined"
      ? JSON.parse(localStorage.getItem("productTreeSelect") || "[]")
      : [];

  const [treeSelectValue, setTreeSelectValue] = useState<string[]>([]);

  const getFriendlyContentList = async ({
    postCode = "",
    latitude = 0,
    longitude = 0,
  }: {
    postCode?: string;
    latitude?: number;
    longitude?: number;
  }) => {
    await getFriendlyContent(postCode, latitude, longitude).then((res: any) => {
      setProductInfoList(res);
    });
  };
  const getClassificationList = async () => {
    await getClassification().then((res: any) => {
      setClassification(res);
      const productNameList = getProductNameList(res);
      const defaultSelect = defaultProductTreeSelect.filter(
        (productCode: any) =>
          productNameList.some((product: any) => product.code === productCode)
      );
      setTreeSelectValue(defaultSelect);
    });
  };
  const treeItemClick = (newValue: string[]) => {
    setTreeSelectValue(newValue);
  };

  useEffect(() => {
    if (
      defaultUseLocation &&
      !!location &&
      !!location.latitude &&
      !!location.longitude
    ) {
      const { latitude, longitude } = location || {
        latitude: 0,
        longitude: 0,
      };
      Promise.all([
        getClassificationList(),
        getFriendlyContentList({ postCode: "", latitude, longitude }),
      ]);
    } else {
      getClassificationList();
    }
  }, []);

  return (
    <ProductInfoListContext.Provider
      value={{
        productInfoList,
        getFriendlyContentList,
        classification,
        treeSelectValue,
        treeItemClick,
      }}
    >
      {children}
    </ProductInfoListContext.Provider>
  );
};

export default ProductInfoListProvider;
