import { useContext } from "react";
import AppContext from "./appProvider";

const useApp = () => useContext(AppContext);

export default useApp;
