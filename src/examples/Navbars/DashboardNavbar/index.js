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

import { useState, useEffect } from "react";
import './dashbaordNavbar.scss';

// react-router components
import { useLocation, Link, useNavigate } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Argon Dashboard 2 MUI example components
import Breadcrumbs from "examples/Breadcrumbs";

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarDesktopMenu,
} from "examples/Navbars/DashboardNavbar/styles";

// Argon Dashboard 2 MUI context
import {
  useArgonController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";
import { AccountCircle, Key, Logout, Person } from "@mui/icons-material";
import { Grid, MenuItem } from "@mui/material";
import Loader from "components/loader/Loader";
import { postRequest } from "services/axios-api-request/axios_api_Request";
import { apiurl } from "constants/apiURLsConstants";
import toaster from "utility/toaster/toaster";
import routerConstants from "constants/routerConstants";
import MyProfileDialog from "components/My Profile Dialog/MyProfileDialog";

function DashboardNavbar({ absolute, light, isMini }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useArgonController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);
  const [isLoading, setIsLoading] = useState(false);
  const [openMyProfileDialog, setOpenMyProfileDialog] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  const handleMiniSidenav = () => {
    setMiniSidenav(dispatch, !miniSidenav);
  }

  /* ***************** 
  1. get full or short user name based on type parameter ,
  2. for full name => nothing to pass as a parameter , 
  3. for short name => type = 'short' 
   ****************** */
  const getUserName = (type) => {
    const user = JSON.parse(localStorage.getItem("user_data"));
    if (user) {
      if (type === 'short') {
        const splitName = user?.name?.split(' ');
        const shortName = `${splitName[0][0] + splitName[splitName?.length - 1][0]}`
        return shortName;
      }
      return user?.name;
    }
  }

  // ****************** for logout *******************
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
      handleCloseMenu();
      navigate(routerConstants?.loginRoute)
    }
    else {
      toaster('error', res?.data?.message)
      handleCloseMenu();
      setIsLoading(false)
    }
  }

  // Render the user menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
    // sx={{ mt: 2 }}
    >
      <MenuItem
        onClick={() => {
          setOpenMyProfileDialog(!openMyProfileDialog);
          handleCloseMenu();
        }}
        disableRipple
      >
        <Person />
        <span>My Profile</span>
      </MenuItem>
      <MenuItem
        onClick={() => {
          navigate(routerConstants?.changePasswordRoute);
          handleCloseMenu();
        }}
        disableRipple
      >
        <Key />
        <span>Change Password</span>
      </MenuItem>
      <MenuItem onClick={handleLogout} disableRipple>
        {!isLoading ?
          <>
            <Logout />
            <span>Logout</span></>
          :
          <Loader dotsColor={'black'} />
        }
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar
        position={absolute ? "absolute" : navbarType}
        color="inherit"
        sx={(theme) => navbar(theme, { transparentNavbar, absolute, light })}
        className="top-dashboard-navbar-container"
      >
        <Toolbar sx={(theme) => navbarContainer(theme, { navbarType })}>
          <ArgonBox
            color={light && transparentNavbar ? "white" : "dark"}
            mb={{ xs: 1, md: 0 }}
            sx={(theme) => navbarRow(theme, { isMini })}
          >
            <Icon style={{ marginRight: '20px', cursor: 'pointer', display: `${!miniSidenav ? 'none' : ''}` }} fontSize="medium" onClick={handleMiniSidenav}>
              {miniSidenav ? "menu" : "menu_open"}
            </Icon>
            <Breadcrumbs
              icon="home"
              title={route[route.length - 1]}
              route={route}
              light={transparentNavbar ? light : false}
            />
          </ArgonBox>
          {isMini ? null : (
            <ArgonBox sx={(theme) => navbarRow(theme, { isMini })}>

              <ArgonBox color={light ? "white" : "inherit"}>
                <IconButton onClick={handleOpenMenu} style={{ gap: '5px' }} sx={navbarIconButton} size="medium">
                  {/* <AccountCircle color={light ? "white" : "inherit"} /> */}
                  <Grid className="dashbaord-navbar-avatar">
                    <span>{getUserName('short')}</span>
                  </Grid>
                  <ArgonTypography
                    variant="button"
                    fontWeight="medium"
                    color={light && transparentNavbar ? "white" : "dark"}
                  >
                    <span style={{ fontSize: '15px' }}>{getUserName()}</span>
                  </ArgonTypography>
                </IconButton>

                {renderMenu()}
              </ArgonBox>
            </ArgonBox>
          )}
        </Toolbar>
      </AppBar>

      {
        openMyProfileDialog && <MyProfileDialog open={openMyProfileDialog} setOpen={setOpenMyProfileDialog} />
      }
    </>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: true,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
