"use client";
import React, { useState, useEffect, createContext, useContext } from "react";
import Filter from "@/components/Filter";
import { Alert } from "antd";
import ShopList from "@/components/ShopList";
import ProductInfoListProvider from "@/context/ProductInfoProvider";
import LocationProvider from "@/context/LocationProvider";

const Page = () => {
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  return (
      <LocationProvider warningCallback={() => setIsAlertVisible(true)}>
        <ProductInfoListProvider>
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
      </LocationProvider>
  );
};

export default Page;
