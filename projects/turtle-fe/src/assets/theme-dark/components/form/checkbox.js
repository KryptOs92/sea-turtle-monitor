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

// NextJS Material Dashboard 2 PRO base styles
import borders from "/src/assets/theme-dark/base/borders";
import colors from "/src/assets/theme-dark/base/colors";

// NextJS Material Dashboard 2 PRO helper functions
import pxToRem from "/src/assets/theme-dark/functions/pxToRem";
import linearGradient from "/src/assets/theme-dark/functions/linearGradient";

const { borderWidth, borderColor } = borders;
const { transparent, white } = colors;

const checkbox = {
  styleOverrides: {
    root: {
      "& .MuiSvgIcon-root": {
        backgroundPosition: "center",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        width: pxToRem(20),
        height: pxToRem(20),
        color: transparent.main,
        border: `${borderWidth[1]} solid ${borderColor}`,
        borderRadius: pxToRem(5.6),
      },

      "&:hover": {
        backgroundColor: transparent.main,
      },

      "&.Mui-focusVisible": {
        border: `${borderWidth[2]} solid ${white.main} !important`,
      },
    },

    colorPrimary: {
      color: borderColor,

      "&.Mui-checked": {
        color: white.main,

        "& .MuiSvgIcon-root": {
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 -1 22 22'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='2.5' d='M6 10l3 3l6-6'/%3e%3c/svg%3e"), ${linearGradient(
            white.main,
            white.main
          )}`,
          borderColor: white.main,
        },
      },
    },

    colorSecondary: {
      color: borderColor,

      "& .MuiSvgIcon-root": {
        color: white.main,
        "&.Mui-checked": {
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 -1 22 22'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='2.5' d='M6 10l3 3l6-6'/%3e%3c/svg%3e"), ${linearGradient(
            white.main,
            white.main
          )}`,
          borderColor: white.main,
        },
      },
    },
  },
};

export default checkbox;
