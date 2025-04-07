import React from "react";
import { LeftOutlined } from "@ant-design/icons";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex justify-center items-center h-11 bg-[#4CC7CB] text-white font-bold text-xl relative">
      {/* <Link href="/" className="text-white absolute left-4">
        <LeftOutlined />
      </Link> */}
      <div className="flex justify-center items-center">友善時光地圖</div>
    </header>
  );
};

export default Header;
