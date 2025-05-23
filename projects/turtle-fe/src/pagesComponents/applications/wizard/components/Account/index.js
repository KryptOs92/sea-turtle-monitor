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

import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/src/components/MDBox";
import MDTypography from "/src/components/MDTypography";
import MDButton from "/src/components/MDButton";

function Account() {
  const [design, setDesign] = useState(false);
  const [code, setCode] = useState(false);
  const [develop, setDevelop] = useState(false);

  const handleSetDesign = () => setDesign(!design);
  const handleSetCode = () => setCode(!code);
  const handleSetDevelop = () => setDevelop(!develop);

  const customButtonStyles = ({
    functions: { pxToRem, rgba },
    borders: { borderWidth },
    palette: { transparent, dark },
    typography: { size },
  }) => ({
    width: pxToRem(164),
    height: pxToRem(130),
    borderWidth: borderWidth[2],
    mb: 1,
    ml: 0.5,

    "&.MuiButton-contained, &.MuiButton-contained:hover": {
      boxShadow: "none",
      border: `${borderWidth[2]} solid ${transparent.main}`,
    },

    "&:hover": {
      backgroundColor: `${transparent.main} !important`,
      border: `${borderWidth[2]} solid ${dark.main} !important`,
      color: rgba(dark.main, 0.75),
    },

    "& .material-icons-round": {
      fontSize: `${size["3xl"]} !important`,
    },
  });

  return (
    <MDBox>
      <MDBox width="80%" textAlign="center" mx="auto" my={4}>
        <MDBox mb={1}>
          <MDTypography variant="h5" fontWeight="regular">
            What are you doing? (checkboxes)
          </MDTypography>
        </MDBox>
        <MDTypography variant="body2" color="text">
          Give us more details about you. What do you enjoy doing in your spare
          time?
        </MDTypography>
      </MDBox>
      <MDBox mt={2}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={3}>
            <MDBox textAlign="center">
              <MDButton
                color="dark"
                variant={design ? "contained" : "outlined"}
                onClick={handleSetDesign}
                sx={customButtonStyles}
              >
                <Icon sx={{ color: design ? "white" : "inherit" }}>brush</Icon>
              </MDButton>
              <MDTypography variant="h6" sx={{ mt: 1 }}>
                Design
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} sm={3}>
            <MDBox textAlign="center">
              <MDButton
                color="dark"
                variant={code ? "contained" : "outlined"}
                onClick={handleSetCode}
                sx={customButtonStyles}
              >
                <Icon sx={{ color: design ? "white" : "inherit" }}>
                  integration_instructions
                </Icon>
              </MDButton>
              <MDTypography variant="h6" sx={{ mt: 1 }}>
                Code
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} sm={3}>
            <MDBox textAlign="center">
              <MDButton
                color="dark"
                variant={develop ? "contained" : "outlined"}
                onClick={handleSetDevelop}
                sx={customButtonStyles}
              >
                <Icon sx={{ color: design ? "white" : "inherit" }}>
                  developer_mode
                </Icon>
              </MDButton>
              <MDTypography variant="h6" sx={{ mt: 1 }}>
                Develop
              </MDTypography>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default Account;
