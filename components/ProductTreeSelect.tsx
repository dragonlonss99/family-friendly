import React from "react";
import { TreeSelect, Button } from "antd";
import { mapProductInfoListToTreeData } from "@/util/productInfoUtil";
import { useProductInfoList } from "@/context/ProductInfoProvider";

const ProductTreeSelect: React.FC = () => {
  const { classification, treeSelectValue, treeItemClick } =
    useProductInfoList();

  const treeData = mapProductInfoListToTreeData(classification);

  const handleClick = () => {
    localStorage.setItem("productTreeSelect", JSON.stringify(treeSelectValue));
  };

  return (
    <div className="py-4 flex gap-2 items-center">
      <TreeSelect
        showSearch
        value={treeSelectValue}
        dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
        placeholder="請選擇商品"
        allowClear
        multiple
        treeCheckable={true}
        showCheckedStrategy="SHOW_PARENT"
        onChange={treeItemClick}
        treeData={treeData}
        className="w-full"
      />
      <Button type="primary" onClick={handleClick} className="self-end">
        記住選擇的商品
      </Button>
    </div>
  );
};

export default ProductTreeSelect;
