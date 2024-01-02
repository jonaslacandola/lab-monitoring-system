import { createContext, useContext, useReducer } from "react";

const UsersContext = createContext();
const initialUsersState = {
  user: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "users/signedIn":
      return { ...state, user: action.payload };
    case "users/fetchedSession":
      return { ...state, user: action.payload };
    case "users/signedOut":
      return { ...state, user: null };
  }
}

function UsersProvider({ children }) {
  const [{ user }, dispatch] = useReducer(reducer, initialUsersState);

  return (
    <UsersContext.Provider value={{ user, dispatch }}>
      {children}
    </UsersContext.Provider>
  );
}

export function useUsersProvider() {
  const data = useContext(UsersContext);

  if (!data) console.error("Users context is used above provider!");

  return data;
}

export default UsersProvider;
