
import { Outlet } from "react-router-dom";

import FallingFlowers from "../components/FallingFlowers/FallingFlowers";
import BackgroundMusic from "../components/BackgroundMusic/BackgroundMusic";

import "./MainLayout.css";

function MainLayout() {
  return (
    <div className="main-layout">
      {/* Hoa rơi toàn website */}
      <FallingFlowers />

      {/* Nhạc nền dùng chung */}
      <BackgroundMusic />

      {/* Nội dung của từng trang */}
      <div className="layout-content">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
