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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/src/components/MDBox";
import MDTypography from "/src/components/MDTypography";
import MDButton from "/src/components/MDButton";

function StatusCell({ icon, color, status }) {
  return (
    <MDBox display="flex" alignItems="center">
      <MDBox mr={1}>
        <MDButton
          variant="outlined"
          color={color}
          size="small"
          iconOnly
          circular
        >
          <Icon sx={{ fontWeight: "bold" }}>{icon}</Icon>
        </MDButton>
      </MDBox>
      <MDTypography
        variant="caption"
        fontWeight="medium"
        color="text"
        sx={{ lineHeight: 0 }}
      >
        {status}
      </MDTypography>
    </MDBox>
  );
}

// Typechecking props for the StatusCell
StatusCell.propTypes = {
  icon: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default StatusCell;
