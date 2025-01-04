import { useMemo, useReducer } from "react";
import AppRouter from "./components/router";
import { defaultUserContext, UserContext, userReducer } from "./contexts/user";

const RootRouter = () => {
  const [user, dispatchUser] = useReducer(userReducer, defaultUserContext);
  
  const memoizedValue = useMemo(
    () => ({ user, dispatchUser }),
    [user, dispatchUser]
  );


  return (
    <UserContext.Provider value={memoizedValue}>
      <AppRouter />
    </UserContext.Provider>
  );
};

export default RootRouter;
