import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Aside from "../components/Aside";
import Conteiner from "../components/Conteiner";

function Layout() {
  return (
    <div className="layout">
      <Header />
      <div className="main-content">
        <Aside />
        <Conteiner>
          <Outlet />
        </Conteiner>
      </div>
    </div>
  );
}

export default Layout;