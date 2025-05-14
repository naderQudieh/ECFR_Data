import { Outlet } from "@tanstack/react-router";
import { Header } from "./Header";
 
export const Root = () => {
  return (
      <div className="p-2">
          <Header/>   
          <div className="my-2">
            <Outlet />
          </div>
    </div>
  );
};
