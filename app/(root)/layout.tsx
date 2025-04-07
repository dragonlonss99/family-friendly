import React from "react";
import Header from "@/components/Header";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gray-100">
      <div className="max-w-screen-lg mx-auto bg-white min-h-screen">
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default layout;
