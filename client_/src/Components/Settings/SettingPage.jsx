import React, { useEffect, useState } from "react";
import UsersInfo from "../Tools/UserInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "../Tools/Modal";
const SettingPage = () => {
  const [prenom, setPrenom] = useState({ prenom: "" });
  const [nom, setNom] = useState({ nom: "" });
  const [email, setEmail] = useState({ email: "" });
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [messageError, setMessageError] = useState("");
  const modifyUser = async (e) => {
    e.preventDefault();
    await axios.put(`${import.meta.env.VITE_API_BASE_URL}/update/user`, {
      nom: nom.nom,
      prenom: prenom.prenom,
      email: email.email,
      id_user: UsersInfo.id,
    });

    fetchAllUsers();
    toast.success("Your account has been updated");
  };

  const updatePassword = async () => {
    const { data } = await axios.put(
      `${import.meta.env.VITE_API_BASE_URL}/password/update`,
      {
        password1,
        password2,
        id_user: UsersInfo.id,
      }
    );
    setMessageError(data?.message);
    if (data?.success !== "") {
      toast.success(data?.success);
      setShowPasswordModal(false);
    }
  };

  const fetchAllUsers = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/user/${UsersInfo.id}`
    );

    setPrenom({ prenom: data.prenom });
    setNom({ nom: data.nom });
    setEmail({ email: data.email });
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="w-full mt-8  flex flex-col ">
      <ToastContainer autoClose={2000} />
      <form
        onSubmit={modifyUser}
        className="bg-white shadow-md p-3 border rounded w-[80%] mx-auto"
      >
        <div className="flex items-center p-2 w-full  gap-5">
          <div className="w-1/2">
            <label htmlFor="prn" className="font-semibold">
              First name
            </label>
            <input
              type="text"
              value={prenom.prenom}
              id="prn"
              onChange={(e) => setPrenom({ prenom: e.target.value })}
              placeholder="example@test.com"
              className="bg-white p-1 w-full shadow px-1 rounded "
              required
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="Nom" className="font-semibold">
              Last name
            </label>
            <input
              type="text"
              id="Nom"
              value={nom.nom}
              onChange={(e) => setNom({ nom: e.target.value })}
              placeholder="example@test.com"
              className="bg-white p-1 w-full shadow px-1 rounded "
              required
            />
          </div>
        </div>

        <div className="flex flex-col p-2  gap-3">
          <label htmlFor="eml" className="font-semibold">
            Email{" "}
          </label>
          <input
            type="email"
            id="eml"
            value={email.email}
            onChange={(e) => setEmail({ email: e.target.value })}
            placeholder="example@test.com"
            className="bg-white p-1 w-full shadow px-1 rounded "
            required
          />
        </div>
        <div className="w-full ml-2">
          <button className="bg-blue-600 text-white font-bold p-1.5 text-base mt-5 rounded">
            Update
          </button>
        </div>
        <div className="flex flex-col p-2  gap-3 ml-1">
          <div
            onClick={() => setShowPasswordModal((prev) => !prev)}
            className=" cursor-pointer underline flex items-center gap-2 text-blue-600 mt-5 "
          >
            <FontAwesomeIcon icon={faEdit} className="w-4 h-4" />
            Change password
          </div>
        </div>
      </form>

      <Modal isOpen={showPasswordModal} setIsOpen={setShowPasswordModal}>
        <div className="w-full">
          <div className="flex flex-col">
            <label htmlFor="pass" className="mb-1 font-semibold">
              New password
            </label>
            <input
              type="password"
              id="pass"
              onChange={(e) => setPassword1(e.target.value)}
              placeholder="**********"
              className="bg-white p-1 w-full shadow px-1 rounded-lg border"
              required
            />
          </div>

          <div className="flex flex-col mt-5">
            <label htmlFor="pass" className="mb-1 font-semibold">
              Comfirm password
            </label>
            <input
              type="password"
              id="pass"
              onChange={(e) => setPassword2(e.target.value)}
              placeholder="**********"
              className="bg-white p-1 w-full shadow rounded-lg  px-1 rounded border "
              required
            />
          </div>
          <button
            onClick={updatePassword}
            className="bg-blue-600 text-white text-base p-1.5 w-44 rounded mt-5 font-medium"
          >
            Change password
          </button>
          {messageError !== "" && (
            <div className="text-red-600 mt-3 mb-2">{messageError}</div>
          )}
        </div>
      </Modal>

      {/* {JSON.stringify(User)} */}
    </div>
  );
};

export default SettingPage;
