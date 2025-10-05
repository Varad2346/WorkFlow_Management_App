import React, { useState } from "react";
import { useSelector } from "react-redux";

const ColModel = () => {
  const project = useSelector((state) => state.project);

  const [colDetails, setcolDetails] = useState({
    title: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setcolDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { title } = colDetails;

    try {
      //   const token = localStorage.getItem("token");
      //   const decodedToken = jwtDecode(token);
      //   const id = decodedToken.user._id;

      if (!project.currentProj) {
        console.error("User ID not found in token");
        return;
      }
      let id=project.currentProj
      if (project.currentProj) {
        const response = await fetch(`http://localhost:3000/api/column/new`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, id }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
          console.log(data);
          console.log("Fetched Projects:", data.data);
        } else {
          console.error("Failed to fetch projects:", data.message);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    false && (
      <div className="border-2 container  absolute w-full h-full box-content grid place-items-center z-40">
        <div className="w-1/4 shadow-md h-1/3 bg-white p-4">
          <div className="p-4 flex flex-col gap-3">
            <span>Title</span>
            <input
              type="text"
              placeholder="Enter column name"
              name="title"
              className="bg-gray-100 p-2"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="flex flex-row items-center justify-between py-6 px-4">
            <button
              style={{ backgroundColor: "var(--theme-color)" }}
              className=" text-white p-3 w-1/2 mx-1"
              onClick={() => handleSubmit()}
            >
              Submit
            </button>
            <button
              className="bg-gray-400 text-white p-3 w-1/2 mx-1"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ColModel;
