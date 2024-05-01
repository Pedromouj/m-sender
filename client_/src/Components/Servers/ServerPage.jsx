import axios from "axios";
import React, { useEffect, useState } from "react";
import UsersInfo from "../Tools/UserInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faInfoCircle, faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "../Tools/Modal";
import { ToastContainer, toast } from "react-toastify";

const ServerPage = () => {
  const [servers, setServers] = useState([]);
  const [showPass, setShowPass] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [Item, setItem] = useState(null);
  const [name, setName] = useState();
  const [host, setHost] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [ItemTable, setItemTable] = useState({});
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [deletedId, setDeletedInd] = useState(0);
  const insertServer = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/server-insert`,
      {
        Libelle: name,
        host,
        email,
        password,
        type: "normale",
        id_user: UsersInfo.id,
      }
    );
    showAllservers();
    if (data.message !== "") {
      setCreateModal(false);
      toast.success(data.message);
    }
  };

  const activateMail = async (id) => {
    await axios.post(`${import.meta.env.VITE_API_BASE_URL}/server/activate`, {
      id,
      id_user: UsersInfo.id,
    });
    showAllservers();
  };

  const showAllservers = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/servers/${UsersInfo.id}`
      );
      setServers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const checkIfPasswordCorrect = async (item) => {
    setShowPass((prev) => !prev);
    setItem(item);
  };

  const showServer = (item) => {
    setShowUpdateModal((prev) => !prev);
    setItemTable(item);
  };

  const updateServer = async (e) => {
    e.preventDefault();
    const libelle = document.getElementById("nameLbl").value;
    const hostname = document.getElementById("hostname").value;
    const pass = document.getElementById("pass").value;
    const email_ = document.getElementById("eml").value;
    const { data } = await axios.put(
      `${import.meta.env.VITE_API_BASE_URL}/update/server`,
      {
        Libelle: libelle,
        host: hostname,
        type: "normale",
        email: email_,
        password: pass,
        id: ItemTable?.id,
        id_user: UsersInfo?.id,
      }
    );
    showAllservers();
    if (data.message !== "") {
      setShowUpdateModal(false);
      toast.success(data.message);
    }
  };

  const showPopUpDelete = async (id) => {
    setConfirmationModal((prev) => !prev);
    setDeletedInd(id);
  };

  const deleteServer = async (answer) => {
    if (answer === "yes") {
      try {
        const { data } = await axios.put(
          `${import.meta.env.VITE_API_BASE_URL}/delete/server`,
          {
            id: deletedId,
            id_user: UsersInfo?.id,
          }
        );
        showAllservers();
        if (data.message !== "") {
          toast.success(data.message);
        }
        setConfirmationModal(false);
      } catch (error) {
        console.error(error);
      }
    } else if (answer === "no") {
      setConfirmationModal(false);
    }
  };

  useEffect(() => {
    showAllservers();
  }, []);
  return (
    <div>
      <ToastContainer autoClose={1500} />
      <div className="text-2xl  mt-6 font-semibold text-center flex justify-center items-center gap-3">
        <div>Information about your server (SMTP)</div>
        <FontAwesomeIcon icon={faInfoCircle} className="w-6 h-8" />
      </div>
      <button
        onClick={() => setCreateModal((prev) => !prev)}
        className="text-white mt-10  bg-blue-600 p-1 w-40 rounded flex items-center justify-center gap-3"
      >
        Create server
        <FontAwesomeIcon icon={faPlus} className="w-5 h-5 text-white " />
      </button>
      <div className="container relative overflow-x-auto sm:rounded-lg  shadow-md">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500  bg-white ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Server name
              </th>
              <th scope="col" className="px-6 py-3">
                host
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                password
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {servers.map((item) => (
              <tr key={item.id} className="odd:bg-white  even:bg-gray-50 ">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.Libelle}
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.host}
                </th>
                <td className="px-6 py-4">{item.email}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3 ">
                    *******
                    <FontAwesomeIcon
                      icon={faEye}
                      onClick={() => checkIfPasswordCorrect(item)}
                      className="w-4 h-4 mb-1 text-blue-600 cursor-pointer hover:opacity-65 duration-100 transition-all"
                    />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => showServer(item)}
                      className="font-medium text-blue-600  hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => activateMail(item.id)}
                      disabled={item.status !== 0}
                      className={`font-medium ${
                        item.status !== 1
                          ? "text-green-600  hover:underline"
                          : "text-gray-600  cursor-default "
                      } `}
                    >
                      {item.status !== 1 ? "Activate" : "Activated"}
                    </button>

                    <button
                      onClick={() => showPopUpDelete(item.id)}
                      type="button"
                      className="font-medium text-red-600  hover:underline"
                    >
                      remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={showPass} setIsOpen={setShowPass}>
        <div className="flex items-center gap-3 justify-center h-24 text-xl">
          <div className="font-semibold">Your password :</div>
          <div>{Item?.password}</div>
        </div>
      </Modal>

      <Modal setIsOpen={setConfirmationModal} isOpen={confirmationModal}>
        <div className="flex flex-col   font-bold">
          <div className="mt-5 mb-10 w-full text-center text-xl">
            Are you sure you want to delete this server ?
          </div>
          <div className="flex mt-2 mb-4 justify-center gap-3">
            <button
              onClick={() => deleteServer("yes")}
              className="bg-green-500 text-white cursor-pointer hover:opacity-70 transition-all duration-100 p-1.5 w-52 rounded"
            >
              Ok
            </button>
            <button
              onClick={() => deleteServer("no")}
              className="bg-red-600 cursor-pointer hover:opacity-70 transition-all duration-100 text-white p-1.5 w-52 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={createModal} setIsOpen={setCreateModal}>
        <form
          onSubmit={insertServer}
          className="flex flex-col w-full bg-white mx-auto p-3 mt-5"
        >
          <div className="flex flex-col p-2  gap-3">
            <label htmlFor="name" className="font-semibold">
              Name
            </label>
            <input
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
              placeholder="Google, Microsoft ..."
              className="bg-white p-1 w-full shadow px-1 rounded "
              required
            />
          </div>

          <div className="flex flex-col p-2  gap-3">
            <label htmlFor="name" className="font-semibold">
              Host name
            </label>
            <input
              type="text"
              id="name"
              onChange={(e) => setHost(e.target.value)}
              placeholder="stmp ..."
              className="bg-white p-1 w-full shadow px-1 rounded "
              required
            />
          </div>
          <div className="flex flex-col p-2  gap-3">
            <label htmlFor="eml" className="font-semibold">
              Email{" "}
            </label>
            <input
              type="email"
              id="eml"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@test.com"
              className="bg-white p-1 w-full shadow px-1 rounded "
              required
            />
          </div>
          <div className="flex flex-col p-2  gap-3">
            <label htmlFor="pass" className="font-semibold">
              Password
            </label>
            <input
              type="password"
              id="pass"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="**********"
              className="bg-white p-1 w-full shadow px-1 rounded "
              required
            />
          </div>
          <div className="flex flex-col p-2  gap-3 mt-1">
            <button
              type="submit"
              className="bg-blue-600 p-1 text-white w-52 rounded"
            >
              Create
            </button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={showUpdateModal} setIsOpen={setShowUpdateModal}>
        <form
          onSubmit={updateServer}
          className="flex flex-col w-full bg-white mx-auto p-3 mt-5"
        >
          <div className="flex flex-col p-2  gap-3">
            <label htmlFor="name" className="font-semibold">
              Name
            </label>
            <input
              type="text"
              id="nameLbl"
              defaultValue={ItemTable.Libelle}
              onChange={(e) => setName(e.target.value)}
              placeholder="Google, Microsoft ..."
              className="bg-white p-1 w-full shadow px-1 rounded "
              required
            />
          </div>

          <div className="flex flex-col p-2  gap-3">
            <label htmlFor="hostname" className="font-semibold">
              Host name
            </label>
            <input
              type="text"
              id="hostname"
              defaultValue={ItemTable.host}
              onChange={(e) => setHost(e.target.value)}
              placeholder="stmp ..."
              className="bg-white p-1 w-full shadow px-1 rounded "
              required
            />
          </div>
          <div className="flex flex-col p-2  gap-3">
            <label htmlFor="eml" className="font-semibold">
              Email{" "}
            </label>
            <input
              type="email"
              id="eml"
              defaultValue={ItemTable.email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@test.com"
              className="bg-white p-1 w-full shadow px-1 rounded "
              required
            />
          </div>
          <div className="flex flex-col p-2  gap-3">
            <label htmlFor="pass" className="font-semibold">
              Password
            </label>
            <input
              type="text"
              id="pass"
              defaultValue={ItemTable.password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="**********"
              className="bg-white p-1 w-full shadow px-1 rounded "
              required
            />
          </div>
          <div className="flex flex-col p-2  gap-3 mt-1">
            <button
              type="submit"
              className="bg-blue-600 p-1 text-white w-52 rounded"
            >
              update
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ServerPage;
