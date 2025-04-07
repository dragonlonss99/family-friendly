import React, { createContext, useState, useContext } from "react";

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
  updateProductInfoList: (productInfoList: any[]) => void;
}>({ productInfoList: [], updateProductInfoList: () => {} });

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

  const updateProductInfoList = (productInfoList: any[]) => {
    setProductInfoList(productInfoList);
  };
  return (
    <ProductInfoListContext.Provider
      value={{ productInfoList, updateProductInfoList }}
    >
      {children}
    </ProductInfoListContext.Provider>
  );
};

export default ProductInfoListProvider;
