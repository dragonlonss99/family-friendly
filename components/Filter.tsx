import React, { useState, useEffect } from "react";
import { CaretDownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { CityList } from "@/data/city";
import { getFriendlyContent } from "@/util/api";
import { Dropdown, Space, Button, Modal } from "antd";
import { useProductInfoList } from "@/context/ProductInfoProvider";
import { useLocation } from "@/context/LocationProvider";
import ProductTreeSelect from "./ProductTreeSelect";

const Filter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<{
    name: string;
    code: string | number;
  } | null>(null);
  const { updateProductInfoList } = useProductInfoList();
  const {
    location,
    getLocation,
    defaultUseLocation,
    setDefaultUseLocationToLocalStorage,
  } = useLocation();
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const locationItems: MenuProps["items"] = CityList.map((city) => ({
    key: city.name,
    label: city.name,
    children: (() => {
      const result = [
        {
          key: `${city.name}_all`,
          label: "不限",
          onClick: () => {
            setSelectedCity({ name: city.name, code: city.name });
          },
        },
        ...city.districts.map((district) => ({
          key: district.code,
          label: district.name,
          onClick: () => {
            setSelectedCity({ name: district.name, code: district.code });
          },
        })),
      ];
      return result;
    })(),
  }));

  const handleClickLocation = () => {
    getLocation();
    if (!defaultUseLocation) {
      setIsLocationModalOpen(true);
    }
  };
  const handleOkLocation = () => {
    setIsLocationModalOpen(false);
    setDefaultUseLocationToLocalStorage(true);
  };
  const handleCancelLocation = () => {
    setIsLocationModalOpen(false);
    setDefaultUseLocationToLocalStorage(false);
  };

  useEffect(() => {
    if (selectedCity) {
      const { latitude, longitude } = location || { latitude: 0, longitude: 0 };
      getFriendlyContent(selectedCity.code as string, latitude, longitude).then(
        (res) => {
          updateProductInfoList(res);
        }
      );
    } else {
      if (location) {
        const { latitude, longitude } = location;
        getFriendlyContent("", latitude, longitude).then((res) => {
          updateProductInfoList(res);
        });
      }
    }
  }, [selectedCity, location, updateProductInfoList]);

  return (
    <div className="border-b-gray-200 border-b-1 px-4 p-4">
      <div className="flex gap-4 items-center">
        <Dropdown
          menu={{ items: locationItems }}
          trigger={["click"]}
          arrow
          open={isOpen}
          onOpenChange={setIsOpen}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              {selectedCity?.name || "區域"}
              <CaretDownOutlined
                className={`transition-all duration-100 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </Space>
          </a>
        </Dropdown>
        <Button onClick={handleClickLocation} type="primary">
          {defaultUseLocation ? "重新取得目前位置" : "使用目前位置"}
        </Button>
        {/* <div>種類</div>
      <div>單品</div> */}
        <Modal
          open={isLocationModalOpen}
          onCancel={handleCancelLocation}
          onOk={handleOkLocation}
          okText="好的"
          cancelText="不要"
        >
          <div>要開啟預設每次都直接使用目前位置嗎？</div>
        </Modal>
      </div>
      <ProductTreeSelect />
    </div>
  );
};

export default Filter;
