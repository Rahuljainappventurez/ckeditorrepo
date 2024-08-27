import routerConstants from 'constants/routerConstants';
import React, { useEffect } from 'react'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';

export default function PublicRouter() {
  const isLoggedIn = localStorage.getItem("ACCESS_TOKEN");
  const location = useLocation();
  const navigate = useNavigate();


  useEffect(() => {
    const otpToken = localStorage.getItem("OTP_TOKEN");

    // Define routes that require OTP_TOKEN to be present
    const protectedRoutes = [
      routerConstants?.otpVerifyRoute,
      routerConstants?.resetPasswordRoute,
    ];

    // Check if the current route is in the protected routes
    const isProtectedRoute = protectedRoutes.includes(location.pathname);

    // If on a protected route and OTP_TOKEN is not present, redirect to login
    if (isProtectedRoute && !otpToken) {
      localStorage.clear();
      navigate(routerConstants?.loginRoute);
    }

    else if (!isProtectedRoute && otpToken) {
      localStorage.clear();
      navigate(routerConstants?.loginRoute);
    }



  }, [location.pathname]);
  return (
    <>
      {
        !isLoggedIn ? (
          <Outlet />
        ) : (<Navigate to={"/"} />)
      }
    </>
  )
}
