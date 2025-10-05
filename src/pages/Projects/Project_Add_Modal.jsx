import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { AddProj, reload } from "../Projects/projectSlice.js";

const Project_Add_Modal = () => {
  const project = useSelector((state) => state.project);
  const profile = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [projectDetails, setprojectDetails] = useState({
    projectName: "",
    Domain: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setprojectDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { projectName, Domain } = projectDetails;

    try {
      const token = profile.token;
      const decodedToken = jwtDecode(token);
      const id = decodedToken.user._id;

      if (!id) {
        console.error("User ID not found in token");
        return;
      }

      const response = await fetch(
        `http://localhost:3000/api/project/new/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ projectName, Domain }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        dispatch(reload({ reload: !project.reload }));
        console.log("Fetched Projects:", data.data);
      } else {
        console.error("Failed to fetch projects:", data.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    project.projModal && (
      <div className="container absolute w-screen h-screen box-content grid place-items-center">
        <div className="w-1/4 shadow-md h-1/2 bg-white p-4">
          <div className="p-4 flex flex-col gap-3">
            <span>Project Title</span>
            <input
              type="text"
              placeholder="Enter project name"
              name="projectName"
              className="bg-gray-100 p-2"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="p-4 flex flex-col gap-3">
            <span>Domain</span>
            <input
              type="text"
              placeholder="Enter domain name"
              name="Domain"
              className="bg-gray-100 p-2"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="flex flex-row items-center justify-between py-6 px-4 cursor-pointer">
            <button
              style={{ backgroundColor: "var(--theme-color)" }}
              className=" text-white p-3 w-1/2 mx-1"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button
              className="bg-gray-400 text-white p-3 w-1/2 mx-1 cursor-pointer"
              onClick={() => dispatch(AddProj({ projModal: false }))}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default Project_Add_Modal;
