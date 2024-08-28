import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import routerConstants from "../constants/routerConstants";
import MainLayout from "layouts/main-layout/MainLayout";

export default function PrivateRouter() {
  const isLoggedIn = localStorage.getItem("ACCESS_TOKEN");
  return (
    <>
      {isLoggedIn ? (
        <MainLayout>
          <Outlet />
        </MainLayout>
       ) : ( 
         <Navigate to={routerConstants?.loginRoute} /> 
       )} 
    </>
  );
}
