import { useEffect } from "react";
import { useReducer } from "react";
import { getUserAPI } from "../Api/Auth";
import { LOGIN_SUCCESS } from "./Constant";
import DataContext from "./Context";
import UpdateState, { InitState } from "./Reducer";


function DataProvider({children}) {
    const [login, loginHandle] = useReducer(UpdateState, InitState)
    const loadUser = async () => {
         if (login.isLoggedIn) {
            const response = await getUserAPI()
            console.log(response.data);
            if (response.data) {
                loginHandle({
                    type: LOGIN_SUCCESS,
                    payload: {
                      user: response.data
                    }
                  })
            }
            
         }
        
      }
      useEffect(() => {
        loadUser()
      },[])
    const data = {login,loginHandle}
    return (
        <DataContext.Provider value = {data}>
            {children}
        </DataContext.Provider>
    )
}
export default DataProvider