import { useContext } from "react"
import DataContext from "./Context"

const useDataContext = () => {
    return useContext(DataContext);
};

export {useDataContext};