import Hero from "../components/Hero";
import { Outlet } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <Hero />
      <Outlet></Outlet>
    </>
  );
};

export default HomePage;
