import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const LayoutMain = () => {
  return (
    <>
      <div className="grid grid-cols-[250px_minmax(0,1fr)] min-h-screen">
        <Sidebar />
        <div className="py-4 px-[35px]">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
};

export default LayoutMain;
