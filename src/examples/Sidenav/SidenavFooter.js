/**
=========================================================
* Argon Dashboard 2 MUI - v3.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-material-ui
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Link from "@mui/material/Link";

// Argon Dashboard 2 MUI components
import ArgonButton from "components/ArgonButton";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Argon Dashboard 2 MUI context
import { useArgonController } from "context";

// Images
import icon from "assets/images/illustrations/icon-documentation.svg";
import { Button } from "@mui/material";
import { postRequest } from "services/axios-api-request/axios_api_Request";
import toaster from "utility/toaster/toaster";
import { useNavigate } from "react-router-dom";
import routerConstants from "constants/routerConstants";
import { useState } from "react";
import Loader from "components/loader/Loader";
import { apiurl } from "constants/apiURLsConstants";

function SidenavFooter() {
  const navigate = useNavigate();
  const [controller] = useArgonController();
  const [isLoading, setIsLoading] = useState(false);
  const { miniSidenav, darkSidenav } = controller;

  const handleLogout = async () => {
    setIsLoading(true);
    const token = localStorage.getItem('ACCESS_TOKEN')
    const res = await postRequest(apiurl?.LOGOUT_URL, {
      token
    })
    if (res?.data?.success) {
      setIsLoading(false)
      localStorage.clear();
      toaster('success', res?.data?.message)
      navigate(routerConstants?.loginRoute)
    }
    else {
      toaster('error', res?.data?.message)
      setIsLoading(false)
    }
  }

  return (
    <ArgonBox opacity={miniSidenav ? 0 : 1} sx={{ transition: "opacity 200ms linear" }}>

      <ArgonBox display="flex" flexDirection="column" style={{ padding: '0 24px' }}>
        {
          !isLoading ?
            <ArgonButton
              component={Button}
              color="dark"
              size="small"
              fullWidth
              disableHover={true}
              sx={{ mb: 3, marginTop: '24px' }}
              onClick={handleLogout}
            >
              {'Logout'}
            </ArgonButton>
            :
            <ArgonButton
              component={Button}
              color="dark"
              size="small"
              fullWidth
              disableHover={true}
              sx={{ mb: 3, marginTop: '24px' }}
            >
              {<Loader dotsColor={'white'} />}
            </ArgonButton>
        }
      </ArgonBox>
    </ArgonBox>
  );
}

export default SidenavFooter;
