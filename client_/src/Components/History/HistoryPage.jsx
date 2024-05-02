import axios from "axios";
import UsersInfo from "../Tools/UserInfo";
import { useEffect, useState } from "react";

const HistoryPage = () => {
  const [histories, setHistories] = useState([]);

  const fetchAllHistories = async () => {
    const { data } = await axios.get(
      `http://localhost:3001/history/${UsersInfo.id}`
    );
    setHistories(data);
  };

  useEffect(() => {
    fetchAllHistories();
  }, []);

  return (
    <div className="flex flex-col w-full">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            Your Sent Emails
            <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
              This is a list of all the emails you have sent, organized by date.
              This list can be generated automatically.
            </p>
          </caption>

          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryPage;
