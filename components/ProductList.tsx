import React, { useMemo, useState } from "react";
import Image from "next/image";
import { Collapse, Button, Modal } from "antd";

const ProductList = ({ productListData }: { productListData: any }) => {
  const categoryList = productListData?.categories || [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductCode, setSelectedProductCode] = useState<string>("");
  const [imgError, setImgError] = useState(false);

  const handleShowPicture = (code: string) => {
    setIsModalOpen(true);
    setSelectedProductCode(code);
    setImgError(false);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const imgSrc = useMemo(() => {
    if (imgError) {
      return "/img/default-image.jpeg";
    }
    const path = `https://prod-aim.azurewebsites.net/AIM/${selectedProductCode}.jpg`;
    return path;
  }, [selectedProductCode, imgError]);

  return (
    <div>
      <div className="flex flex-col gap-2 px-4 py-4">
        {categoryList.map((category: any) => (
          <div key={category.code}>
            <div className=" font-bold mb-2">{category.name}</div>
            <div className="flex flex-col gap-2">
              {category.products.map((product: any) => (
                <div key={product.code} className="flex gap-2 justify-between">
                  <div className="flex gap-2 items-center">
                    <Image
                      src="/img/search.svg"
                      alt={product.name}
                      width={16}
                      height={16}
                      onClick={() => handleShowPicture(product.code)}
                    />
                    <span className="">{product.name}</span>
                  </div>
                  <div className="text-[#43B0B4] font-bold">{product.qty}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Modal
        open={isModalOpen}
        onClose={handleOk}
        onCancel={handleOk}
        centered
        footer={() => (
          <div className="flex justify-center">
            <Button
              type="primary"
              style={{ backgroundColor: "#43B0B4", color: "white" }}
              onClick={handleOk}
            >
              確認
            </Button>
          </div>
        )}
      >
        <img
          src={imgSrc}
          alt="product"
          className="w-[200px] m-auto"
          onError={() => setImgError(true)}
        />
      </Modal>
    </div>
  );
};

export default ProductList;
