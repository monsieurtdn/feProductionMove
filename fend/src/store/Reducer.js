import { LOGIN_FAILED, LOGIN_SUCCESS } from "./Constant"
const InitState = {
    user: null,
    isLoggedIn: false,

}
const UpdateState = (state, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                
                isLoggedIn: true,
                ...action.payload
            }
            case LOGIN_FAILED:
                return {
                    ...InitState
                }
        default: throw new Error("Invalid Action")
    }
}
export { InitState }
export default UpdateState