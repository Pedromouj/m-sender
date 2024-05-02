import React, { useEffect, useState } from "react";
import SunEditor from "suneditor-react";
import axios from "axios";
import * as XLSX from "xlsx";
import "suneditor/dist/css/suneditor.min.css";
import Spinner from "../Tools/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import UsersInfo from "../Tools/UserInfo";

const Forms = () => {
  const [objects, setObject] = useState();
  const [description, setDescription] = useState();
  const [excelData, setExcelData] = useState([]);
  const [Status, setStatus] = useState(null);
  const [activateMail, setActivateMail] = useState(null);
  const [recipientsName, serRecipientsName] = useState("");
  const [loading, setLoading] = useState(false);
  const [selctedOption, setSelectedOption] = useState("xlsx");
  const [arrayInput, setArrayInput] = useState([]);
  const [valueInput, setValueInput] = useState("");
  const handleImageUpload = (files, info, uploadHandler) => {
    console.log(files, info);
    const uploadedImageUrl = "URL_OF_UPLOADED_IMAGE";
    uploadHandler(uploadedImageUrl);
  };

  const getActivateMail = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/server/activate/${UsersInfo.id}`
    );
    setActivateMail(data);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      const arr = [];
      jsonData.map((item) =>
        item.map((row) => {
          arr.push(row);
        })
      );
      setExcelData(arr);
    };

    reader.readAsArrayBuffer(file);
  };

  const sendMessage = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/send-emails`,
        {
          id_user: UsersInfo.id,
          host: activateMail.host,
          user: activateMail.email,
          pass: activateMail.password,
          recipients: selctedOption !== "xlsx" ? arrayInput : excelData,
          subject: objects,
          Content: description,
          recipientsName,
        }
      );
      setStatus(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getActivateMail();
  }, []);

  const addArrayInput = () => {
    setArrayInput((prev) => [...prev, valueInput]);
    document.getElementById("mailinpt").value = "";
  };

  const deleteItemFromArray = (index) => {
    const deletedArray = arrayInput.filter((_, i) => i !== index);

    setArrayInput(deletedArray);
  };

  useEffect(() => {
    if (selctedOption === "xlsx") {
      setArrayInput([]);
    }
  }, [selctedOption]);

  return (
    <div className="w-full flex flex-col">
      {!activateMail && (
        <div className="text-lg w-[60%] mx-auto mt-14 border border-red-600 rounded shadow-md text-red-600 bg-red-100 p-3  text-center">
          <b>{UsersInfo.nom_complet} </b> you should be <b>active</b> or{" "}
          <b>create</b> server for send mails automatically
        </div>
      )}

      {activateMail && (
        <form
          onSubmit={sendMessage}
          className="mt-4 flex flex-col w-[55%] gap-3 p-3 border rounded-lg  bg-white shadow-lg mx-auto"
        >
          <div className="flex items-center gap-3 w-full justify-center mt-4 text-base">
            <div className="flex  items-center gap-1">
              <input
                onChange={(e) => setSelectedOption(e.target.value)}
                defaultChecked
                name="choice"
                id="xls"
                type="radio"
                value={"xlsx"}
              />
              <label className="mb-1 cursor-pointer" htmlFor="xls">
                Excel file
              </label>
            </div>
            <div className="flex items-center gap-1">
              <input
                onChange={(e) => setSelectedOption(e.target.value)}
                name="choice"
                id="normale"
                type="radio"
                value={"normale"}
              />
              <label className="mb-1 cursor-pointer" htmlFor="normale">
                Add yours
              </label>
            </div>
          </div>
          {arrayInput.length > 0 && (
            <div
              className={`grid grid-cols-8  items-center gap-2 w-fit  ${
                arrayInput.length > 4 && "h-32"
              }  overflow-x-auto mx-auto`}
            >
              {arrayInput.map((item, indx) => (
                <div
                  className="text-sm col-span-4 border-black border-2 flex  items-center gap-2 w-fit rounded-full p-1.5 bg-gray-100 text-black"
                  key={indx}
                >
                  {item}
                  <FontAwesomeIcon
                    onClick={() => deleteItemFromArray(indx)}
                    icon={faX}
                    className="w-3 h-3 cursor-pointer hover:opacity-50"
                  />
                </div>
              ))}
            </div>
          )}
          {selctedOption === "xlsx" ? (
            <div className="flex p-1 flex-col mx-auto w-[80%]">
              <label
                className="mb-2 font-sans font-semibold text-lg"
                htmlFor="file_upload"
              >
                Upload your excel file
              </label>
              <input
                type="file"
                id="file_upload"
                accept=".xlsx, .xls"
                onChange={handleFileUpload}
                className="relative m-0 block file:bg-gray-600 file:text-white w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-surface transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:me-3 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-e file:border-solid file:border-inherit file:px-3  file:py-[0.32rem] file:text-surface focus:border-primary focus:text-gray-700 focus:shadow-inset focus:outline-none   "
                required
              />
            </div>
          ) : (
            <div className="flex p-1 flex-col mx-auto w-[80%]">
              <label
                className="mb-2 font-sans font-semibold "
                htmlFor="file_upload"
              >
                Add your email
              </label>
              <div className="flex items-center">
                <input
                  type="email"
                  id="mailinpt"
                  placeholder="example@mail.com"
                  onChange={(e) => setValueInput(e.target.value)}
                  className="relative m-0 block bg-white rounded-l-lg h-9  w-full min-w-0 flex-auto cursor-pointer  shadow rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-surface transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:me-3 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-e file:border-solid file:border-inherit file:px-3  file:py-[0.32rem] file:text-surface focus:border-primary focus:text-gray-700 focus:shadow-inset focus:outline-none   "
                  required={arrayInput.length === 0}
                />
                <button
                  type="button"
                  onClick={addArrayInput}
                  className="bg-blue-600 text-white p-1 flex items-center w-10 justify-center h-9 rounded-r-lg border shadow"
                >
                  <FontAwesomeIcon icon={faPlus} className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
          <div className="mx-auto mt-1 w-[80%]">
            <label className="font-semibold" htmlFor="recipient">
              Recipient Name
            </label>
            <input
              id="recipient"
              type="text"
              className="w-full bg-white border shadow p-1.5 rounded"
              placeholder="recipient Name"
              onChange={(e) => serRecipientsName(e.target.value)}
              required
            />
          </div>

          <div className="mx-auto mt-1 w-[80%]">
            <label className="font-semibold" htmlFor="recipient">
              Object of mail
            </label>

            <input
              type="text"
              className="w-full bg-white border shadow p-1.5 rounded"
              placeholder="Object of mail"
              onChange={(e) => setObject(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col  mx-auto mt-2 w-[80%]">
            <SunEditor
              onChange={(content) => setDescription(content)}
              setOptions={{
                buttonList: [
                  [
                    "image",
                    "bold",
                    "italic",
                    "underline",
                    "strike",
                    "subscript",
                    "superscript",
                    "fontColor",
                    "hiliteColor",
                    "align",
                    "outdent",
                    "indent",
                    "list",
                    "removeFormat",
                  ],
                ],

                callBackSaveUrl: handleImageUpload,
                imageFileInput: true,
              }}
            />

            <button
              type="submit"
              className="bg-blue-600 text-white p-1.5 mt-2 rounded w-44"
            >
              Send
            </button>
          </div>

          {loading ? (
            <Spinner classes={"flex justify-center w-full h-24"} />
          ) : (
            Status !== null &&
            (Status?.error ? (
              <div className="flex gap-3 text-red-600 justify-center w-full items-center">
                {Status?.error}
              </div>
            ) : (
              <div className="flex gap-3 text-green-600 justify-center w-full items-center">
                {Status.success}
                <FontAwesomeIcon icon={faCheck} className="w-5 h-5" />
              </div>
            ))
          )}
        </form>
      )}
    </div>
  );
};

export default Forms;
