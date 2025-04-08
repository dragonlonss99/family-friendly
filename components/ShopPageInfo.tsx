"use client";
import React, { useMemo, useState, useEffect, useCallback } from "react";
import ProductGroup from "./ProductGroup";
import Image from "next/image";
import ProductList from "./ProductList";
import { getShopInfo } from "@/util/api";
import { useSearchParams, useParams } from "next/navigation";

const ShopInfo = () => {
  const [shopInfo, setShopInfo] = useState<any>(null);
  const searchParams = useSearchParams();
  const params = useParams();
  const shopKey = params.shopKey as string;
  const code = searchParams.get("code") as string;

  const [selectedProductGroup, setSelectedProductGroup] = useState<string>("");
  const productListData = useMemo(() => {
    return shopInfo?.info?.find(
      (productGroupInfo: any) => productGroupInfo.code === selectedProductGroup
    );
  }, [selectedProductGroup, shopInfo]);

  const fetchShopInfo = useCallback(async () => {
    const locationItem = localStorage.getItem("location");
    const location = locationItem ? JSON.parse(locationItem) : null;
    const latitude = location?.latitude || 0;
    const longitude = location?.longitude || 0;

    const shopInfoData = await getShopInfo(shopKey, latitude, longitude);
    setShopInfo(shopInfoData[0]);
  }, [shopKey]);
  useEffect(() => {
    fetchShopInfo();
  }, [fetchShopInfo]);

  useEffect(() => {
    setSelectedProductGroup(code || shopInfo?.info[0].code);
  }, [code, shopInfo]);

  return (
    <div>
      <div className="border-b-gray-200 border-b-1 pb-4">
        <div className="flex justify-between">
          <div className="px-4 py-4 flex gap-2 items-center">
            <span className="text-xl font-bold">{shopInfo?.name}</span>
          </div>
          <div className="px-4 py-4 flex gap-1 items-center">
            <Image
              src="/img/direction.svg"
              alt="direction"
              width={20}
              height={20}
              className="pb-1"
            />
            <span className="text-sm">
              {shopInfo?.distance ? shopInfo?.distance : "---"}m
            </span>
          </div>
        </div>
        <div className="px-4 pb-2 text-sm text-gray-500">
          {shopInfo?.address}
        </div>
        <div className="grid grid-cols-4 gap-2 sm:gap-4 bg-[#EEFBFC] p-4">
          {shopInfo?.info?.map((productGroupInfo: any) => (
            <ProductGroup
              key={productGroupInfo.code}
              productGroupInfo={productGroupInfo}
              shopKey={shopInfo?.oldPKey}
              selectedProductGroup={selectedProductGroup}
              setSelectedProductGroup={setSelectedProductGroup}
            />
          ))}
        </div>
      </div>
      <ProductList productListData={productListData} />
    </div>
  );
};

export default ShopInfo;
