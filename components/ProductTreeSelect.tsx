import React from "react";
import { TreeSelect, Button } from "antd";
import { mapProductInfoListToTreeData } from "@/util/productInfoUtil";
import { useProductInfoList } from "@/context/ProductInfoProvider";

const ProductTreeSelect: React.FC = () => {
  const { classification, treeSelectValue, treeItemClick } =
    useProductInfoList();

  const treeData = mapProductInfoListToTreeData(classification);

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
        size="large"
      />
      <style jsx global>{`
        .ant-select-tree {
          font-size: 16px !important;
        }
      `}</style>
    </div>
  );
};

export default ProductTreeSelect;
