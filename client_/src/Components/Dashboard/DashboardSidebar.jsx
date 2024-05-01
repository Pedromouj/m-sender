import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useApp from "../Tools/useApp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faGear,
  faHome,
  faServer,
} from "@fortawesome/free-solid-svg-icons";

const DashboardSidebar = () => {
  const { isOpenSidebar, setIsOpenSidebar } = useApp();
  const [Active, setActive] = useState("Dashboard");

  // useEffect(() => {
  //   // Function to update innerWidth
  //   const handleResize = () => {
  //     setInnerWidth(window.innerWidth);
  //   };

  //   // Attach the event listener when the component mounts
  //   window.addEventListener("resize", handleResize);

  //   // Remove the event listener when the component unmounts
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []); // Empty dependency array ensures the effect runs only once on mount

  // const logout = () => {
  //   localStorage.clear();
  //   window.location.href = "/login";
  // };
  return (
    <>
      {!isOpenSidebar && (
        <div
          onClick={() => setIsOpenSidebar(true)}
          className="fixed top-0 left-0  w-full h-screen lg:hidden z-40"
        ></div>
      )}

      <div
        className={`fixed lg:relative top-0 left-0 z-50 flex flex-col gap-4 items-center text-md  font-bold ${
          !isOpenSidebar ? "w-fit lg:w-72" : "w-0 lg:w-16"
        } h-screen overflow-hidden text-white  bg-[#000000d1] shadow-md `}
      >
        <Link to={"/"} onClick={() => setActive("Dashboard")}>
          <div className="flex items-center text-white  justify-center  w-full px-3 mt-9  cursor-pointer font-bold">
            {isOpenSidebar ? (
              <img
                src={"/icons/mailing.jpg"}
                alt=""
                className="w-9  h-9 rounded-full"
              />
            ) : (
              <div className="flex flex-col w-full">
                <img
                  src={"/icons/mailing.jpg"}
                  alt=""
                  className="w-20  h-20 rounded-full"
                />
                <div className="mt-2 text-xl font-mono">M-Sender</div>
              </div>
            )}
            <button
              className="rounded p-1  text-white lg:hidden"
              onClick={() => setIsOpenSidebar((prev) => !prev)}
            >
              {/* <XMarkIcon className="w-5 h-5" /> */}
            </button>
          </div>
        </Link>
        <div
          className={`${
            !isOpenSidebar ? "w-full px-2" : "py-3"
          } space-y-2 font-medium overflow-auto`}
        >
          <div className="flex flex-col gap-1 items-center w-full mt-3 mb-5  select-none">
            {/* authState.identifiant.startsWith("harry") &&  */}
          </div>
          <ul className="mb-5  text-lg font-thin">
            <Link to={"/"}>
              <li
                onClick={() => setActive("Dashboard")}
                className={` text-white transition-all ${
                  Active === "Dashboard" &&
                  "bg-[#303750] font-bold   border-l-4 rounded-none border-[#0fd1fe] w-auto"
                } hover:bg-[#303750] duration-100 cursor-pointer   list-none mt-2 flex items-center p-2 rounded-lg     group`}
              >
                {!isOpenSidebar ? (
                  <span className=" flex gap-5 items-center text-lg ">
                    <FontAwesomeIcon icon={faHome} className="w-6 h-6" />
                    Home
                  </span>
                ) : (
                  <FontAwesomeIcon icon={faHome} className="w-6 h-6" />
                )}
              </li>
            </Link>

            <Link to={"/documenation"}>
              <li
                onClick={() => setActive("documentation")}
                className={` text-white transition-all ${
                  Active === "documentation" &&
                  "bg-[#303750] font-bold   border-l-4 rounded-none border-[#0fd1fe] w-auto"
                } hover:bg-[#303750] duration-100 cursor-pointer   list-none mt-2 flex items-center p-2 rounded-lg     group`}
              >
                {!isOpenSidebar ? (
                  <span className=" flex gap-5 items-center text-lg ">
                    <FontAwesomeIcon icon={faBookOpen} className="w-6 h-6" />
                    Documentation
                  </span>
                ) : (
                  <FontAwesomeIcon icon={faBookOpen} className="w-6 h-6" />
                )}
              </li>
            </Link>

            <Link to={"/settings"}>
              <li
                onClick={() => setActive("Settings")}
                className={` text-white transition-all ${
                  Active === "Settings" &&
                  "bg-[#303750] font-bold   border-l-4 rounded-none border-[#0fd1fe] w-auto"
                } hover:bg-[#303750] duration-100 cursor-pointer   list-none mt-2 flex items-center p-2 rounded-lg     group`}
              >
                {!isOpenSidebar ? (
                  <span className=" flex gap-5 items-center text-lg ">
                    <FontAwesomeIcon icon={faGear} className="w-6 h-6" />
                    Settings
                  </span>
                ) : (
                  <FontAwesomeIcon icon={faGear} className="w-6 h-6" />
                )}
              </li>
            </Link>

            <Link to={"/servers"}>
              <li
                onClick={() => setActive("servers")}
                className={` text-white transition-all ${
                  Active === "servers" &&
                  "bg-[#303750] font-bold   border-l-4 rounded-none border-[#0fd1fe] w-auto"
                } hover:bg-[#303750] duration-100 cursor-pointer   list-none mt-2 flex items-center p-2 rounded-lg     group`}
              >
                {!isOpenSidebar ? (
                  <span className=" flex gap-5 items-center text-lg ">
                    <FontAwesomeIcon icon={faServer} className="w-6 h-6" />
                    My Servers
                  </span>
                ) : (
                  <FontAwesomeIcon icon={faServer} className="w-6 h-6" />
                )}
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
};

export default DashboardSidebar;
