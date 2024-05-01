import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    await axios.post(`${import.meta.env.VITE_API_BASE_URL}/register`, {
      nom,
      prenom,
      email,
      password,
      status: 1,
    });
  };

  return (
    <div className="flex flex-col w-full">
      <div className="w-full mx-auto ">
        <form
          onSubmit={handleRegister}
          className="flex flex-col   bg-white shadow-lg border rounded-b p-2 mx-auto"
        >
          <div className="flex items-center gap-5  w-[90%] mt-5 p-1 mx-auto">
            <div>
              <label className="font-semibold text-lg" htmlFor="email">
                First name
              </label>
              <input
                className="bg-white p-1 border shadow rounded px-3"
                type="text"
                onChange={(e) => setPrenom(e.target.value)}
                id="email"
                placeholder="example@xyz.com"
                required
              />
            </div>
            <div>
              <label className="font-semibold text-lg" htmlFor="email">
                Last name
              </label>
              <input
                className="bg-white p-1 border shadow rounded px-3"
                type="text"
                onChange={(e) => setNom(e.target.value)}
                id="email"
                placeholder="example@xyz.com"
                required
              />
            </div>
          </div>

          <div className="flex flex-col w-[90%] mt-5 p-1 mx-auto">
            <label className="font-semibold text-lg" htmlFor="email">
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
          <div className="flex flex-col w-[90%] mt-5 p-1 mx-auto">
            <label className="font-semibold text-lg" htmlFor="password">
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
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
