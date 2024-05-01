import React, { useState } from "react";
import Login from "../Login";
import Register from "./Register";

const RegisterForm = () => {
  const [activeTab, setActiveTab] = useState(true);

  const bglog = activeTab ? "bg-[#02a88a]" : "bg-[#0599f1]";
  const bgReg = activeTab ? "bg-[#0599f1] " : "bg-[#02a88a]";
  return (
    <div className="flex flex-col w-[40%] mx-auto mt-14">
      <div className="capitalize text-2xl  text-center font-bold flex justify-center items-center gap-5">
        <div className="flex flex-col">
          <img
            src="/icons/mailing.jpg"
            className="border-2  shadow rounded-full w-24 h-24 "
          />
          <div className="text-2xl mt-2 font-mono">M-Sender</div>
        </div>
      </div>

      <div className="flex items-center justify-center w-full gap-2 mt-5 bg-white shadow p-1 ">
        <div
          onClick={() => setActiveTab(true)}
          className={` cursor-pointer h-10 items-center rounded text-white border-white flex justify-center w-full ${bglog}`}
        >
          Login
        </div>
        <div
          onClick={() => setActiveTab(false)}
          className={`w-full flex justify-center items-center rounded text-white h-10 cursor-pointer ${bgReg}`}
        >
          Sign up
        </div>
      </div>
      <div>{activeTab ? <Login /> : <Register />}</div>
    </div>
  );
};

export default RegisterForm;
