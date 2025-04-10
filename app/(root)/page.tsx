"use client";
import React, { useState, useEffect, createContext, useContext } from "react";
import Filter from "@/components/Filter";
import { Alert } from "antd";
import ShopList from "@/components/ShopList";
import ProductInfoListProvider from "@/context/ProductInfoProvider";

const Page = () => {
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  return (
    <ProductInfoListProvider warningCallback={() => setIsAlertVisible(true)}>
      <div className="relative">
        <Filter />
        <ShopList />
        {isAlertVisible && (
          <Alert
            message="需要同意使用定位才能計算距離"
            type="warning"
            showIcon
            onClose={() => setIsAlertVisible(false)}
            style={{ position: "absolute", top: 0, right: 0 }}
            closable
          />
        )}
      </div>
    </ProductInfoListProvider>
  );
};

export default Page;
