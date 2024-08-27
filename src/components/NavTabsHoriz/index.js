import { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";

// Argon Dashboard 2 MUI base styles
import breakpoints from "assets/theme/base/breakpoints";
import { useNavigate } from "react-router-dom";

function NavTabsHoriz({ tabsArray, callback, currentTab }) {
    const [tabsOrientation, setTabsOrientation] = useState("horizontal");
    const [tabValue, setTabValue] = useState(currentTab);
    const navigate = useNavigate();

    useEffect(() => {
        // A function that sets the orientation state of the tabs.
        function handleTabsOrientation() {
            return window.innerWidth < breakpoints.values.sm
                ? setTabsOrientation("vertical")
                : setTabsOrientation("horizontal");
        }

        /** 
         The event listener that's calling the handleTabsOrientation function when resizing the window.
        */
        window.addEventListener("resize", handleTabsOrientation);

        // Call the handleTabsOrientation function to set the state with the initial value.
        handleTabsOrientation();

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleTabsOrientation);
    }, [tabsOrientation]);

    const handleSetTabValue = (event, newValue) => {
        setTabValue(newValue);
        // callback(newValue);
        if (tabsArray[newValue]?.route) {
            navigate(tabsArray[newValue]?.route);
        }
    };

    return (
        <ArgonBox position="relative">
            <Card
                sx={{
                    py: 2,
                    px: 2,
                    boxShadow: ({ boxShadows: { md } }) => md,
                }}
            >
                <Grid container spacing={3} alignItems="center" justifyContent={'flex-start'}>
                    <Grid item xs={12} md={6} lg={4} >
                        <AppBar position="static">
                            <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
                                {
                                    tabsArray?.map((tab, index) => (
                                        <Tab
                                            label={tab?.label}
                                            key={`navTabs-${index + 1}`}
                                            icon={tab?.icon}
                                        />
                                    ))
                                }
                            </Tabs>
                        </AppBar>
                    </Grid>
                </Grid>
            </Card>
        </ArgonBox>
    );
}

export default NavTabsHoriz;
