// react
import { useReducer, createContext } from "react";

// reducer & actions
import userReducer, {
  setUser as setUserAction,
  removeUser as removeUserAction,
} from "../reducers/userReducer";

const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, null);

  const setUser = (user) => {
    userDispatch(setUserAction(user));
  };
  const removeUser = () => {
    userDispatch(removeUserAction());
  };

  return (
    <UserContext.Provider value={{ user, setUser, removeUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
