import React from "react";
import Header from "@/components/Header";
import Filter from "@/components/Filter";
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <main>
        {children}
      </main>
    </div>
  );
};

export default layout;
