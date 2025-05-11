/**
=========================================================
* NextJS Material Dashboard 2 PRO - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-material-dashboard-pro
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/src/components/MDBox";
import MDInput from "/src/components/MDInput";
import MDButton from "/src/components/MDButton";
// NextJS Material Dashboard 2 PRO examples
import Breadcrumbs from "/src/examples/Breadcrumbs";
import NotificationItem from "/src/examples/Items/NotificationItem";
import ConnectWallet from "/src/components/ConnectWallet.tsx";
import TurtleConnectWallet from "../../../components/TurtleConnectWallet";
// Custom styles for DashboardTurtle
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarDesktopMenu,
  navbarMobileMenu,
} from "/src/examples/Navbars/DashboardTurtle/styles";
import translations from "./translations.json";
// NextJS Material Dashboard 2 PRO context
import { useMaterialUIController, setTransparentNavbar, setMiniSidenav, setOpenConfigurator } from "/src/context";
import { useSelector } from "react-redux";

function DashboardTurtle({ absolute, light, isMini }) {
  const lang = useSelector((state) => state.lang.value) || "it";
  const t = translations[lang] ?? translations["it"];
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator, darkMode } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const route = useRouter().pathname.split("/").slice(1);

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
  const [openWalletModal, setOpenWalletModal] = useState(false);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);
  const toggleWalletModal = () => {
    setOpenWalletModal(!openWalletModal);
  };
  // Render the notifications menu

  // Styles for the navbar icons
  const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
    >
      <h1>{t.title}</h1>
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <MDBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <IconButton sx={navbarDesktopMenu} onClick={handleMiniSidenav} size="small" disableRipple>
            <Icon fontSize="medium" sx={iconsStyle}>
              {miniSidenav ? "menu_open" : "menu"}
            </Icon>
          </IconButton>
        </MDBox>
        {isMini ? null : (
          <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
            <MDBox color={light ? "white" : "inherit"}>
              <IconButton size="small" disableRipple color="inherit" sx={navbarMobileMenu} onClick={handleMiniSidenav}>
                <Icon sx={iconsStyle} fontSize="medium">
                  {miniSidenav ? "menu_open" : "menu"}
                </Icon>
              </IconButton>
              <IconButton size="small" disableRipple color="inherit" sx={navbarIconButton} onClick={handleConfiguratorOpen}>
                <Icon sx={iconsStyle}>settings</Icon>
              </IconButton>
              <MDButton
                bgColor={darkMode ? "dark" : "white"} // palette.dark.main / palette.white.main
                color={darkMode ? "white" : "dark"}
                onClick={toggleWalletModal}
              >
                {t.connect_wallet}
              </MDButton>
            </MDBox>
          </MDBox>
        )}
      </Toolbar>

      <TurtleConnectWallet openModal={openWalletModal} closeModal={toggleWalletModal} />

      {/* <ConnectWallet openModal={openWalletModal} closeModal={toggleWalletModal} /> */}
    </AppBar>
  );
}

// Setting default values for the props of DashboardTurtle
DashboardTurtle.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardTurtle
DashboardTurtle.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardTurtle;
