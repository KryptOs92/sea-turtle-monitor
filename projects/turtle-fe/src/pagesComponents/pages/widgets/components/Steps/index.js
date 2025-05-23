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
import Card from "@mui/material/Card";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/src/components/MDBox";
import MDTypography from "/src/components/MDTypography";
import MDBadge from "/src/components/MDBadge";

function Steps() {
  return (
    <Card>
      <MDBox p={3}>
        <MDTypography variant="body2" color="text">
          Steps
        </MDTypography>
        <MDBox mt={2} mb={1} lineHeight={0}>
          <MDTypography variant="h3" fontWeight="bold">
            11.4K
          </MDTypography>
        </MDBox>
        <MDBadge
          variant="contained"
          color="success"
          badgeContent="+4.3%"
          container
        />
      </MDBox>
    </Card>
  );
}

export default Steps;
