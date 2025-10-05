import React from "react";
import HomeNav from "./HomeNav";
import Sidebar from "../Projects/Sidebar";
import { useSelector } from "react-redux";
import Board from "../Board/Board";
import Project_Add_Modal from "../Projects/Project_Add_Modal";
import ColModel from "../Board/ColModel";

const Home = () => {
  const { isOpen } = useSelector((state) => state.project);

  return (
    <div className="container w-screen h-screen box-content flex flex-col flex-1">
      <Project_Add_Modal/>
      <ColModel/>
      <HomeNav />
      <div className="flex flex-row flex-1 ">
        <Sidebar isOpen={isOpen} />
        <Board/>
      </div>
    </div>
  );
};

export default Home;
