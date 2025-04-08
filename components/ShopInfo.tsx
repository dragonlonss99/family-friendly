import React from "react";
import ProductGroup from "./ProductGroup";
import { RightOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";

const ShopInfo = ({ shopInfo }: { shopInfo: any }) => {
  const {
    address,
    areaCode,
    city,
    distance,
    info,
    latitude,
    longitude,
    name,
    oldPKey,
    periodType,
    post,
    tel,
    updateDate,
  } = shopInfo;

  return (
    <div className="border-b-gray-200 border-b-1 pb-4">
      <div className="flex justify-between">
        <Link
          href={`/shop/${oldPKey}`}
          className="px-4 py-4 flex gap-2 items-center"
        >
          <span className="text-xl font-bold">{name}</span>
          <RightOutlined />
        </Link>
        <div className="px-4 py-4 flex gap-1 items-center">
          <Image
            src="/img/direction.svg"
            alt="direction"
            width={20}
            height={20}
            className="pb-1"
          />
          <span className="text-sm">{distance ? distance : "---"}m</span>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2 sm:gap-4 bg-[#EEFBFC] p-4">
        {info.map((productGroupInfo: any) => (
          <ProductGroup
            key={productGroupInfo.code}
            productGroupInfo={productGroupInfo}
            shopKey={oldPKey}
          />
        ))}
      </div>
    </div>
  );
};

export default ShopInfo;
