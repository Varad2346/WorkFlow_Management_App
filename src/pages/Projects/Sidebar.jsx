import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { AddProj,setProj } from "../Projects/projectSlice.js";

const Sidebar = ({ isOpen }) => {
  const [projects, setProjects] = useState([]);

  const profile = useSelector((state) => state.auth);
  const project = useSelector((state) => state.project);
  const dispatch = useDispatch();

  useEffect(() => {
    if (profile.token) {
      const fetchData = async () => {
        try {
          const decodedToken = jwtDecode(profile.token);
          const id = decodedToken.user._id;

          if (!id) {
            console.error("User ID not found in token");
            return;
          }

          const response = await fetch(
            `http://localhost:3000/api/project/${id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${profile.token}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();

          if (data.success) {
            setProjects(data.data);
            console.log("Fetched Projects:", data.data);
          } else {
            console.error("Failed to fetch projects:", data.message);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [project.reload]);

  const sidebarClasses = `w-1/6 px-2 h-full shadow-lg bg-white flex flex-col sidebar ${
    isOpen ? "sidebar-open" : ""
  }`;

  return (
    <div className={sidebarClasses}>
      <div className="p-2 text-2xl text-gray-600 h-1/14">
        <div className="flex justify-between items-center">
          <span className="flex items-center ">
            <span>PROJECTS</span>
          </span>
          <span className="flex items-center gap-1">
            <span
              className="material-symbols-outlined bg-gray-100 cursor-pointer"
              onClick={() => dispatch(AddProj({ projModal: true }))}
            >
              add
            </span>
            <span className="material-symbols-outlined bg-gray-100 cursor-pointer">
              more_vert
            </span>
          </span>
        </div>
      </div>
      <div className="flex-1">

      {projects?.map((project) => {
        return (
          <div key={project._id} className="p-3 flex flex-col shadow-md bg-white my-1" onClick={()=>dispatch(setProj({currentProj:project._id}))}>
            <div className="h-1/2 flex justify-between w-full items-center p-2">
              <span className="font-2xl">{project.projectName.toUpperCase()}</span>
              <span className="material-symbols-outlined text-gray-400 cursor-pointer">
                more_vert 
              </span>
            </div>
            <div className="flex-1 flex justify-between items-center p-2">
              <span>{project.Domain.toUpperCase()}</span>
              <span className="material-symbols-outlined cursor-pointer text-gray-400">group_add</span>{" "}
            </div>
          </div>
        );
      })}
      </div>
    </div>
  );
};

export default Sidebar;
