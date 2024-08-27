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

import { useEffect, useState } from "react";

// react-router-dom components
import { useLocation, NavLink } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Argon Dashboard 2 MUI example components
import SidenavItem from "examples/Sidenav/SidenavItem";

// Custom styles for the Sidenav
import SidenavRoot from "examples/Sidenav/SidenavRoot";
import sidenavLogoLabel from "examples/Sidenav/styles/sidenav";

// Argon Dashboard 2 MUI context
import { useArgonController, setMiniSidenav } from "context";
import { KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight } from "@mui/icons-material";
import { Grid } from "@mui/material";

function Sidenav({ color, brand, brandName, routes, userRole, ...rest }) {
  const [controller, dispatch] = useArgonController();
  const { miniSidenav, darkSidenav, layout } = controller;
  const location = useLocation();
  const { pathname } = location;
  const itemName = pathname.split("/").slice(1)[0];

  const closeSidenav = (event) => {
    event.preventDefault();
    setMiniSidenav(dispatch, !miniSidenav);
  };

  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    const handleMiniSidenav = () => {
      setMiniSidenav(dispatch, window.innerWidth < 1200);
    }

    /** 
     The event listener that's calling the handleMiniSidenav function when resizing the window.
    */
    window.addEventListener("resize", handleMiniSidenav);

    // Call the handleMiniSidenav function to set the state with the initial value.
    handleMiniSidenav();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, location]);


  // ********************** Role based sidebar access => array of route's key from routes.js start ***********************
  const roleAccess = {
    "super-admin": [
      '',
      'subject-management',
      'topic-management',
      'branch-management',
      'chapter-management',
      'question-type-management',
      'answer-type-management',
      'origin-management',
      'source-management',
      'source-chapter-management',
      'exam-type-management',
      'difficulty-type-management',
      'school-management',
      'question-bank',
      'employee-management',
      'task-management',
      'NCERT-management',
      'flashcard-management',
      'feedback-management',
      'report-management',
      'subscription-management',
      'coupons-management',
      'student-management',
      'publish-questions',
      'team-management',
    ],
    "content admin": [
      '',
      'subject-management',
      'topic-management',
      'branch-management',
      'chapter-management',
      'question-type-management',
      'answer-type-management',
      'origin-management',
      'source-management',
      'source-chapter-management',
      'exam-type-management',
      'difficulty-type-management',
      'question-bank',
      'employee-management',
      'task-management',
      'NCERT-management',
      'flashcard-management',
      'report-management',
      'publish-questions',
    ],
    "others": ['', 'my-tasks'],
    "team lead": ['', 'team-management', 'NCERT-management', 'flashcard-management', 'question-bank'],
  };
  // ********************** Role based sidebar access => array of route's key from routes.js end ***********************

  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const renderRoutes = routes
    .filter(route => roleAccess[userRole]?.includes(route.key)) // Filter based on role-access
    .map(({ type, name, icon, title, key, href, route }) => {
      let returnValue;

      if (type === "route") {
        if (href) {
          returnValue = (
            <Link href={href} key={key} target="_blank" rel="noreferrer">
              <SidenavItem
                name={name}
                icon={icon}
                active={key === itemName}
                noCollapse={noCollapse}
              />
            </Link>
          );
        } else {
          returnValue = (
            <NavLink to={route} key={key}>
              <SidenavItem name={name} icon={icon} active={key === itemName} />
            </NavLink>
          );
        }
      } else if (type === "title") {
        returnValue = (
          <ArgonTypography
            key={key}
            color={darkSidenav ? "white" : "dark"}
            display="block"
            variant="caption"
            fontWeight="bold"
            textTransform="uppercase"
            opacity={0.6}
            pl={3}
            mt={2}
            mb={1}
            ml={1}
          >
            {title}
          </ArgonTypography>
        );
      } else if (type === "divider") {
        returnValue = <Divider key={key} light={darkSidenav} />;
      }

      return returnValue;
    });

  return (
    <SidenavRoot {...rest} variant="permanent" ownerState={{ darkSidenav, miniSidenav, layout }}>
      <Grid pt={3} pb={1} px={4} display={'flex'} alignItems={'center'}>
        
        <ArgonBox display="flex" alignItems="center">
          {brand && (
            <ArgonBox component="img" src={brand} alt="Argon Logo" width="2rem" mr={0.25} />
          )}
          <ArgonBox
            width={!brandName && "100%"}
            sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}
          >
            <ArgonTypography
              component="h6"
              variant="button"
              fontWeight="medium"
              color={darkSidenav ? "white" : "dark"}
            >
              {brandName}
            </ArgonTypography>
          </ArgonBox>
        </ArgonBox>

        <Grid style={{ position: 'absolute', right: '0', display: 'flex', alignItems: 'center' }}>
          {
            !miniSidenav ?
              <KeyboardDoubleArrowLeft sx={{ fontSize: '30px !important', color: '#000000', cursor: 'pointer' }} onClick={closeSidenav} />
              :
              <KeyboardDoubleArrowRight sx={{ fontSize: '30px !important', color: '#000000', cursor: 'pointer' }} onClick={closeSidenav} />
          }
        </Grid>

      </Grid>
      <Divider light={darkSidenav} />
      <List>{renderRoutes}</List>
      {/* <SidenavFooter/> */}
    </SidenavRoot>
  );
}

// Setting default values for the props of Sidenav
Sidenav.defaultProps = {
  color: "info",
  brand: "",
};

// Typechecking props for the Sidenav
Sidenav.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  brand: PropTypes.string,
  brandName: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
