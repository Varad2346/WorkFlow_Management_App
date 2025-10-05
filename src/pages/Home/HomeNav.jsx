import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Sidebar } from "../Projects/projectSlice.js"; // Adjust the import path

const HomeNav = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.project);
  const handleSidebarToggle = () => {
    dispatch(Sidebar({ isOpen: !isOpen }));
  };

  return (
    <div className="w-screen">
      <div
        className="flex justify-between p-3 pl-2 pr-4 items-center"
        style={{ backgroundColor: "var(--theme-color)" }}
      >
        <div className="px-0 py-1 font-bold text-1xl text-white flex gap-2">
          <span class="material-symbols-outlined cursor-pointer" onClick={handleSidebarToggle}>
            {isOpen? 'left_panel_close':'left_panel_open'}
          </span>
          SprintBoard
        </div>
        <div className="flex gap-4">
          <span class="material-symbols-outlined text-white">
            notifications
          </span>
          <span class="material-symbols-outlined text-white">settings</span>
          <span class="material-symbols-outlined text-white">
            account_circle
          </span>{" "}
        </div>
      </div>
    </div>
  );
};

export default HomeNav;
