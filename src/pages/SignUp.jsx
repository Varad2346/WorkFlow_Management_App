import React, { useState } from "react";
import Navbar from "../component/Navbar";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const { name, email, password } = formData;

      console.log(name, email, password);
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (data.success) {
        navigate("/");
      } else {
        throw new Error("Invalid Credentials");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container relative  w-screen h-screen  grid place-items-center bg-[linear-gradient(to_right,white_50%,theme(colors.blue.500)_50%)]">
      <Navbar />
      <div className="shadow-lg p-7 w-1/3 py-5 bg-white rounded-2xl">
        <div className="flex flex-col text-1xl p-1  pb-7">
          <span className="text-4xl py-2">SingUp</span>
          <span className=" font-medium text-sm" style={{ color: 'var(--theme-color)' }}>
            To Kanban Board
          </span>
        </div>
        <div className="flex flex-col gap-2 py-4">
            <div className="gap-1  py-1 flex flex-col">
            <label htmlFor="email">Name</label>
            <input
              className="outline-none bg-gray-50 p-3 focus:border-1"
              type="text"
              placeholder="Enter your Name"
              name="name"
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="gap-1  py-1 flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              className="outline-none bg-gray-50 p-3 focus:border-1"
              type="email"
              placeholder="Enter your email"
              name="email"
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="gap-1  py-1 flex flex-col">
            <label htmlFor="email">Password</label>
            <input
              className="outline-none bg-gray-50 p-3 focus:border-1"
              type="password"
              placeholder="Enter your password"
              name="password"
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
        
        </div>
        <div className="text-center  p-2 my-2 text-white" onClick={()=>handleSubmit()} style={{ backgroundColor: 'var(--theme-color)' }}>
          <span >SignUp</span>
        </div>
        <div className="text-center p-4">
          <span>
            Already have an account?{" "}
            <a href="/" className="" style={{ color: 'var(--theme-color)' }}>
              Login
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
