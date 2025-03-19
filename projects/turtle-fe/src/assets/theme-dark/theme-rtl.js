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

// @mui material components
import { createTheme } from "@mui/material/styles";
// import Fade from "@mui/material/Fade";

// NextJS Material Dashboard 2 PRO base styles
import colors from "/src/assets/theme-dark/base/colors";
import breakpoints from "/src/assets/theme-dark/base/breakpoints";
import typography from "/src/assets/theme-dark/base/typography";
import boxShadows from "/src/assets/theme-dark/base/boxShadows";
import borders from "/src/assets/theme-dark/base/borders";
import globals from "/src/assets/theme-dark/base/globals";

// NextJS Material Dashboard 2 PRO helper functions
import boxShadow from "/src/assets/theme-dark/functions/boxShadow";
import hexToRgb from "/src/assets/theme-dark/functions/hexToRgb";
import linearGradient from "/src/assets/theme-dark/functions/linearGradient";
import pxToRem from "/src/assets/theme-dark/functions/pxToRem";
import rgba from "/src/assets/theme-dark/functions/rgba";

// NextJS Material Dashboard 2 PRO components base styles for @mui material components
import sidenav from "/src/assets/theme-dark/components/sidenav";
import list from "/src/assets/theme-dark/components/list";
import listItem from "/src/assets/theme-dark/components/list/listItem";
import listItemText from "/src/assets/theme-dark/components/list/listItemText";
import card from "/src/assets/theme-dark/components/card";
import cardMedia from "/src/assets/theme-dark/components/card/cardMedia";
import cardContent from "/src/assets/theme-dark/components/card/cardContent";
import button from "/src/assets/theme-dark/components/button";
import iconButton from "/src/assets/theme-dark/components/iconButton";
import input from "/src/assets/theme-dark/components/form/input";
import inputLabel from "/src/assets/theme-dark/components/form/inputLabel";
import inputOutlined from "/src/assets/theme-dark/components/form/inputOutlined";
import textField from "/src/assets/theme-dark/components/form/textField";
import menu from "/src/assets/theme-dark/components/menu";
import menuItem from "/src/assets/theme-dark/components/menu/menuItem";
import switchButton from "/src/assets/theme-dark/components/form/switchButton";
import divider from "/src/assets/theme-dark/components/divider";
import tableContainer from "/src/assets/theme-dark/components/table/tableContainer";
import tableHead from "/src/assets/theme-dark/components/table/tableHead";
import tableCell from "/src/assets/theme-dark/components/table/tableCell";
import linearProgress from "/src/assets/theme-dark/components/linearProgress";
import breadcrumbs from "/src/assets/theme-dark/components/breadcrumbs";
import slider from "/src/assets/theme-dark/components/slider";
import avatar from "/src/assets/theme-dark/components/avatar";
import tooltip from "/src/assets/theme-dark/components/tooltip";
import appBar from "/src/assets/theme-dark/components/appBar";
import tabs from "/src/assets/theme-dark/components/tabs";
import tab from "/src/assets/theme-dark/components/tabs/tab";
import stepper from "/src/assets/theme-dark/components/stepper";
import step from "/src/assets/theme-dark/components/stepper/step";
import stepConnector from "/src/assets/theme-dark/components/stepper/stepConnector";
import stepLabel from "/src/assets/theme-dark/components/stepper/stepLabel";
import stepIcon from "/src/assets/theme-dark/components/stepper/stepIcon";
import select from "/src/assets/theme-dark/components/form/select";
import formControlLabel from "/src/assets/theme-dark/components/form/formControlLabel";
import formLabel from "/src/assets/theme-dark/components/form/formLabel";
import checkbox from "/src/assets/theme-dark/components/form/checkbox";
import radio from "/src/assets/theme-dark/components/form/radio";
import autocomplete from "/src/assets/theme-dark/components/form/autocomplete";
import flatpickr from "/src/assets/theme-dark/components/flatpickr";
import container from "/src/assets/theme-dark/components/container";
import popover from "/src/assets/theme-dark/components/popover";
import buttonBase from "/src/assets/theme-dark/components/buttonBase";
import icon from "/src/assets/theme-dark/components/icon";
import svgIcon from "/src/assets/theme-dark/components/svgIcon";
import link from "/src/assets/theme-dark/components/link";
import dialog from "/src/assets/theme-dark/components/dialog";
import dialogTitle from "/src/assets/theme-dark/components/dialog/dialogTitle";
import dialogContent from "/src/assets/theme-dark/components/dialog/dialogContent";
import dialogContentText from "/src/assets/theme-dark/components/dialog/dialogContentText";
import dialogActions from "/src/assets/theme-dark/components/dialog/dialogActions";

export default createTheme({
  direction: "rtl",
  breakpoints: { ...breakpoints },
  palette: { ...colors },
  typography: { ...typography },
  boxShadows: { ...boxShadows },
  borders: { ...borders },
  functions: {
    boxShadow,
    hexToRgb,
    linearGradient,
    pxToRem,
    rgba,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ...globals,
        ...flatpickr,
        ...container,
      },
    },
    MuiDrawer: { ...sidenav },
    MuiList: { ...list },
    MuiListItem: { ...listItem },
    MuiListItemText: { ...listItemText },
    MuiCard: { ...card },
    MuiCardMedia: { ...cardMedia },
    MuiCardContent: { ...cardContent },
    MuiButton: { ...button },
    MuiIconButton: { ...iconButton },
    MuiInput: { ...input },
    MuiInputLabel: { ...inputLabel },
    MuiOutlinedInput: { ...inputOutlined },
    MuiTextField: { ...textField },
    MuiMenu: { ...menu },
    MuiMenuItem: { ...menuItem },
    MuiSwitch: { ...switchButton },
    MuiDivider: { ...divider },
    MuiTableContainer: { ...tableContainer },
    MuiTableHead: { ...tableHead },
    MuiTableCell: { ...tableCell },
    MuiLinearProgress: { ...linearProgress },
    MuiBreadcrumbs: { ...breadcrumbs },
    MuiSlider: { ...slider },
    MuiAvatar: { ...avatar },
    MuiTooltip: { ...tooltip },
    MuiAppBar: { ...appBar },
    MuiTabs: { ...tabs },
    MuiTab: { ...tab },
    MuiStepper: { ...stepper },
    MuiStep: { ...step },
    MuiStepConnector: { ...stepConnector },
    MuiStepLabel: { ...stepLabel },
    MuiStepIcon: { ...stepIcon },
    MuiSelect: { ...select },
    MuiFormControlLabel: { ...formControlLabel },
    MuiFormLabel: { ...formLabel },
    MuiCheckbox: { ...checkbox },
    MuiRadio: { ...radio },
    MuiAutocomplete: { ...autocomplete },
    MuiPopover: { ...popover },
    MuiButtonBase: { ...buttonBase },
    MuiIcon: { ...icon },
    MuiSvgIcon: { ...svgIcon },
    MuiLink: { ...link },
    MuiDialog: { ...dialog },
    MuiDialogTitle: { ...dialogTitle },
    MuiDialogContent: { ...dialogContent },
    MuiDialogContentText: { ...dialogContentText },
    MuiDialogActions: { ...dialogActions },
  },
});
