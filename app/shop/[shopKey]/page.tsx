import React from "react";
import ShopPageInfo from "@/components/ShopPageInfo";

const Page = async ({
  params,
  searchParams,
}: {
  params: { shopKey: string };
  searchParams: { code: string };
}) => {
  const { shopKey } = await params;
  const { code } = await searchParams;
  return (
    <div>
      <ShopPageInfo shopKey={shopKey} code={code} />
    </div>
  );
};

export default Page;
