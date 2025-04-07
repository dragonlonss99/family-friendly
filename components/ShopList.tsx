import React from "react";
import { useProductInfoList } from "@/context/ProductInfoProvider";
import ShopInfo from "@/components/ShopInfo";

const ShopList = () => {
  const { productInfoList } = useProductInfoList();

  return (
    <div >
      {productInfoList.map((shopInfo) => (
        <ShopInfo key={shopInfo.oldPKey} shopInfo={shopInfo} />
      ))}
    </div>
  );
};

export default ShopList;
