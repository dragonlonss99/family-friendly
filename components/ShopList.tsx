import React from "react";
import { useProductInfoList } from "@/context/ProductInfoProvider";
import ShopInfo from "@/components/ShopInfo";
import { Empty } from "antd";
import { getFilteredProductInfoList } from "@/util/productInfoUtil";

const ShopList = () => {
  const { productInfoList, treeSelectValue } = useProductInfoList();
  const filteredProductInfoList = getFilteredProductInfoList(
    productInfoList,
    treeSelectValue
  );

  return (
    <div>
      {(Array.isArray(filteredProductInfoList) &&
      filteredProductInfoList.length) ? (
        filteredProductInfoList.map((shopInfo: any) => (
          <ShopInfo key={shopInfo.oldPKey} shopInfo={shopInfo} />
        ))
      ) : (
        <Empty description="找不到任何結果" className="my-20" />
      )}
    </div>
  );
};

export default ShopList;
