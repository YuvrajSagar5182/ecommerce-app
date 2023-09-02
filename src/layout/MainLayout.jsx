import Navbar from "../common/Navbar/Navbar";
import Footer from "../common/Footer/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = (props) => {
  return (
    <>
      <Navbar className="mb-6"></Navbar>
      <Outlet />
      {props.children}
      <Footer />
    </>
  );
};

export default MainLayout;
