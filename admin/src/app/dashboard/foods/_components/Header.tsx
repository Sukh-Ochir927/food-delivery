import React from "react";
import CategoriesTable from "./CategoriesTable";

const Header = () => {
  return (
    <div>
      <div className="flex items-center gap-2 justify-center">
        <CategoriesTable />
      </div>
    </div>
  );
};

export default Header;
