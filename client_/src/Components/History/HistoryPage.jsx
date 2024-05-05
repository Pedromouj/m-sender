import axios from "axios";
import UsersInfo from "../Tools/UserInfo";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import Modal from "../Tools/Modal";
import { ToastContainer, toast } from "react-toastify";

const HistoryPage = () => {
  const [histories, setHistories] = useState([]);
  const [csvData, setCsvData] = useState("");
  const [showMessageConfirmation, setMessageConfirmation] = useState(false);
  const [deletedId, setDeletedId] = useState(null);
  const ref = useRef();

  const fetchAllHistories = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/history/${UsersInfo.id}`
    );
    setHistories(data);
  };
  useEffect(() => {
    fetchAllHistories();
  }, []);

  const handlePrint = useReactToPrint({
    content: () => ref.current,
  });

  const convertToCsv = () => {
    const columns = [];
    histories.map((item) => {
      columns.push({
        date_history: item.date_history,
        email: item.email,
      });
    });
    const csvContent =
      "data:text/csv;charset=utf-8," +
      columns.map((row) => Object.values(row).join(",")).join("\n");
    setCsvData(encodeURI(csvContent));
  };

  const deleteHistory = async (answer) => {
    if (answer === "ok") {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/history/${deletedId}/${
          UsersInfo.id
        }`
      );

      fetchAllHistories();
      toast.success("History deleted susseccfully");
    }

    setMessageConfirmation(false);
  };
  const showMessageDelete = (id) => {
    setMessageConfirmation((prev) => !prev);
    setDeletedId(id);
  };

  return (
    <div className="flex flex-col w-full">
      <ToastContainer autoClose={1500} />
      <div className=" p-3 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
        <div className="text-xl">Your Sent Emails</div>
        <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
          This is a list of all the emails you have sent, organized by date.
          This list can be generated automatically.
        </p>
      </div>

      <div className="p-2 flex items-center gap-3">
        <a
          onClick={convertToCsv}
          href={csvData}
          download="table_data.csv"
          className="flex justify-center text-green-600 border border-green-600 p-1.5 w-52 cursor-pointer rounded "
        >
          CSV
        </a>
        <button
          onClick={handlePrint}
          className="text-red-600 border border-red-600 p-1.5 w-52 cursor-pointer rounded "
        >
          Print
        </button>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table
          ref={ref}
          className="w-full text-sm print:mt-10 text-left rtl:text-right text-gray-500 dark:text-gray-400"
        >
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {histories.map((item) => (
              <tr
                key={item.id_history}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.email}
                </td>
                <td className="px-6 py-4">{item.date_history}</td>
                <td className="print:hidden">
                  <FontAwesomeIcon
                    onClick={() => showMessageDelete(item.id_history)}
                    icon={faTrash}
                    className="w-4 h-4 text-red-600 cursor-pointer hover:opacity-75 transition-all duration-100"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={showMessageConfirmation}
        setIsOpen={setMessageConfirmation}
      >
        <div className="flex flex-col w-full text-2xl font-semibold text-center">
          Are you sure you want delete this history ?
          <div className="flex text-lg items-center gap-4 mt-5 mb-5 w-full justify-center">
            <button
              onClick={() => deleteHistory("ok")}
              className="bg-green-600 text-white p-1.5 w-52 rounded cursor-pointer hover:opacity-60 transition-all duration-100"
            >
              Ok
            </button>
            <button
              onClick={() => deleteHistory("cancel")}
              className="bg-red-600 text-white p-1.5 w-52 rounded cursor-pointer hover:opacity-60 transition-all duration-100"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default HistoryPage;
