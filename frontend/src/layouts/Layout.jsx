import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Aside from "../components/Aside";

export default function Layout() {
  return (
    <div className="flex min-h-screen">
      <Aside />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="m-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}