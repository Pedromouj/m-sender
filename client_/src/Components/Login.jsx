import axios from "axios";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/login`,
      {
        email,
        password,
      }
    );
    localStorage.setItem("token", data.token);
    window.location.href = "/";
  };

  return (
    <div className="flex flex-col w-full">
      <form
        onSubmit={handleLogin}
        className="flex flex-col  w-full bg-white shadow-lg border rounded-b p-2 mx-auto "
      >
        <div className="flex flex-col w-full mt-5 p-1 mx-auto">
          <label className="text-lg" htmlFor="email">
            Email
          </label>
          <input
            className="bg-white p-1 border shadow rounded px-3"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            placeholder="example@xyz.com"
            required
          />
        </div>
        <div className="flex flex-col w-full mt-5 p-1 mx-auto">
          <label className="text-lg" htmlFor="password">
            Password
          </label>
          <input
            className="bg-white p-1 border shadow rounded px-3"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="*********"
            type="password"
            id="password"
            required
          />
        </div>
        <div className="w-full flex justify-center mb-4">
          <button
            type="submit"
            className="bg-blue-600 text-white p-1 font-semibold rounded-md w-72 text-base mt-5 "
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
