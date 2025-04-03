import { useDispatch } from "react-redux";
import { setLang } from "../../lib/langSlice";
import MDButton from "/src/components/MDButton";
import MDBox from "/src/components/MDBox";
import Image from "next/image";
import { useMaterialUIController } from "/src/context";
import ita from "/src/assets/images/flags/ita-flag.svg";
import en from "/src/assets/images/flags/flag-gb.svg";
export default function SwitchLanguage() {
  const [controller, dispatch] = useMaterialUIController();
  const dispatchStore = useDispatch();

  const switchLanguageIT = () => {
    dispatchStore(setLang("it"));
  };
  const switchLanguageEN = () => {
    dispatchStore(setLang("en-US"));
  };
  const { openConfigurator, miniSidenav, fixedNavbar, sidenavColor, transparentSidenav, whiteSidenav, darkMode } = controller;
  const sidenavTypeActiveButtonStyles = ({ functions: { pxToRem, linearGradient }, palette: { white, gradients, background } }) => ({
    height: pxToRem(39),
    //background: darkMode ? white.main : linearGradient(gradients.dark.main, gradients.dark.state),
    color: darkMode ? background.sidenav : white.main,

    "&:hover, &:focus, &:focus:not(:hover)": {
      background: darkMode ? white.main : linearGradient(gradients.dark.main, gradients.dark.state),
      color: darkMode ? background.sidenav : white.main,
    },
  });

  const sidenavTypeButtonsStyles = ({ functions: { pxToRem }, palette: { white, dark, background }, borders: { borderWidth } }) => ({
    height: pxToRem(39),
    background: darkMode ? background.sidenav : white.main,
    color: darkMode ? white.main : dark.main,
    border: `${borderWidth[1]} solid ${darkMode ? white.main : dark.main}`,
    padding: 0,
    "&:hover, &:focus, &:focus:not(:hover)": {
      background: darkMode ? background.sidenav : white.main,
      color: darkMode ? white.main : dark.main,
      border: `${borderWidth[1]} solid ${darkMode ? white.main : dark.main}`,
    },
  });

  return (
    <div className="switch-language-container">
      <MDBox
        sx={{
          display: "flex",
          mt: 2,
          mr: 1,
        }}
      >
        <MDButton
          color="dark"
          onClick={switchLanguageIT}
          variant="gradient"
          style={{ width: "30px", minWidth: "0px" }}
          sx={!transparentSidenav && !whiteSidenav ? sidenavTypeActiveButtonStyles : sidenavTypeButtonsStyles}
        >
          <Image src={ita} alt="pinterest" style={{ width: "35px", height: "35px", display: "block" }} />
        </MDButton>
        <MDBox sx={{ mx: 1, width: "8rem", minWidth: "8rem" }}>
          <MDButton
            color="dark"
            onClick={switchLanguageEN}
            variant="gradient"
            style={{ width: "30px", minWidth: "0px" }}
            sx={!transparentSidenav && !whiteSidenav ? sidenavTypeActiveButtonStyles : sidenavTypeButtonsStyles}
          >
            <Image src={en} alt="pinterest" style={{ width: "35px", height: "35px", display: "block" }} />
          </MDButton>
        </MDBox>
      </MDBox>
    </div>
  );
}
