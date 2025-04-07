import React, { createContext, useState, useEffect, useContext } from "react";
import { getClassification } from "@/util/api";
import { getProductNameList } from "@/util/productInfoUtil";

const ClassificationContext = createContext({
  classification: [],
  productNameList: [],
});

export const useClassification = () => {
  return useContext(ClassificationContext);
};

const ClassificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [classification, setClassification] = useState([]);
  const [productNameList, setProductNameList] = useState([]);
  useEffect(() => {
    getClassification().then((res) => {
      setClassification(res);
    //   setProductNameList(getProductNameList(res as any[]));
    });
  }, []);

  return (
    <ClassificationContext.Provider value={{ classification, productNameList }}>
      {children}
    </ClassificationContext.Provider>
  );
};

export default ClassificationProvider;
