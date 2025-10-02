import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../component/Navbar";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../authSlice";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const { email, password } = formData;

      const response = await fetch(`http://localhost:3000/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.success) {
        dispatch(loginSuccess(data));
        navigate("/home");
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
      <div className="shadow-lg p-7 w-1/3 py-10 bg-white rounded-2xl">
        <div className="flex flex-col text-1xl py-1 pb-7">
          <span className="text-3xl">Login</span>
          <span>Hi, Welcome Back 👋</span>
        </div>
        <div className="flex flex-col gap-2 py-4">
          <div className="gap-1  py-1 flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              className="bg-gray-100 p-3 outline-0 focus:border-1"
              type="email"
              placeholder="Enter your email"
              name="email"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="gap-1  py-1 flex flex-col ">
            <label htmlFor="email">Password</label>
            <input
              className="bg-gray-100 p-3 outline-0 focus:border-1"
              type="password"
              placeholder="Enter your password"
              name="password"
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <div
          className="text-center  p-2 my-2 text-white"
          style={{ backgroundColor: "var(--theme-color)" }}
          onClick={() => handleSubmit()}
        >
          <span>Login</span>
        </div>
        <div className="text-center p-4">
          <span>
            Not registered yet?{" "}
            <a
              href="/register"
              className=""
              style={{ color: "var(--theme-color)" }}
            >
              Create an account
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
