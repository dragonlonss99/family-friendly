import React, { useState } from "react";
import { TreeSelect, Button, Space } from "antd";
import { mapProductInfoListToTreeData } from "@/util/productInfoUtil";
import { useClassification } from "@/context/ClassificationProvider";

const ProductTreeSelect: React.FC = () => {
  const { classification } = useClassification();
  const defaultProductTreeSelect =
    typeof localStorage !== "undefined"
      ? JSON.parse(localStorage.getItem("productTreeSelect") || "[]")
      : [];
  const [value, setValue] = useState<string[]>(defaultProductTreeSelect);
  const treeData = mapProductInfoListToTreeData(classification);
  const onChange = (newValue: string[]) => {
    setValue(newValue);
  };
  const handleClick = () => {
    localStorage.setItem("productTreeSelect", JSON.stringify(value));
  };

  return (
    <div className="py-4 flex gap-2 items-center">
      <TreeSelect
        showSearch
        value={value}
        dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
        placeholder="請選擇商品"
        allowClear
        multiple
        treeCheckable={true}
        showCheckedStrategy="SHOW_PARENT"
        onChange={onChange}
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
