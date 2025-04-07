export const getProductNameList = (productInfoList: any[]) => {
  return productInfoList.reduce((acc, productInfo) => {
    productInfo.categories.forEach((category: any) => {
      category.products.forEach((product: any) => {
        acc.push({ code: product.productCode, name: product.productName });
      });
    });
    return acc;
  }, []);
};

export const mapProductInfoListToTreeData = (productInfoList: any[]) => {
  return productInfoList.map((productInfo) => {
    return {
      value: productInfo.groupCode,
      title: productInfo.groupName,
      children: productInfo.categories.map((category: any) => {
        return {
          value: category.categoryCode,
          title: category.categoryName,
          children: category.products.map((product: any) => {
            return {
              value: product.productCode,
              title: product.productName,
            };
          }),
        };
      }),
    };
  });
};

const containsSelectedProduct = (
  obj: any,
  selectedProducts: string[]
): boolean => {
  // 如果是陣列，遞迴檢查每個元素
  if (Array.isArray(obj)) {
    return obj.some((item) => containsSelectedProduct(item, selectedProducts));
  }

  // 如果是物件，檢查每個屬性
  if (obj && typeof obj === "object") {
    // 檢查物件本身是否有 code 屬性，並且該屬性在 selectedProducts 中
    if (obj.code && selectedProducts.includes(obj.code)) {
      return true;
    }

    // 遞迴檢查物件的每個屬性
    return Object.values(obj).some((value) =>
      containsSelectedProduct(value, selectedProducts)
    );
  }

  // 如果是字串，檢查是否在 selectedProducts 中
  if (typeof obj === "string" && selectedProducts.includes(obj)) {
    return true;
  }

  return false;
};

export const getFilteredProductInfoList = (
  productInfoList: any[],
  selectedProducts: string[]
) => {
  // 如果沒有選中任何產品，返回全部
  if (!selectedProducts || selectedProducts.length === 0) {
    return productInfoList;
  }

  // 過濾 productInfoList
  return productInfoList.reduce((acc, shopInfo) => {
    // 檢查商店的 info 欄位是否包含任何選中的產品
    const info = shopInfo.info || [];
    const hasCodeChildLevelInfo = info.filter((item: any) => {
      return containsSelectedProduct(item, selectedProducts);
    });

    if (hasCodeChildLevelInfo.length > 0) {
      const filteredShopInfo = { ...shopInfo, info: hasCodeChildLevelInfo };
      acc.push(filteredShopInfo);
    }

    return acc;
  }, []);
};
