import { createContext, useState } from "react";
import UsersInfo from "./UserInfo";

const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    username: UsersInfo?.username,
    userid: UsersInfo?.userid,
  });

  const [isOpenSidebar, setIsOpenSidebar] = useState(
    localStorage.getItem("isMiniSideBar") !== "true"
  );

  const [amlSearchInformation, setAmlSearchInformation] = useState(null);

  return (
    <AppContext.Provider
      value={{
        isOpenSidebar,
        setIsOpenSidebar,
        amlSearchInformation,
        setAmlSearchInformation,
        authState,
        setAuthState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
