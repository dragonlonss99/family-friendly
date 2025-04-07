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
