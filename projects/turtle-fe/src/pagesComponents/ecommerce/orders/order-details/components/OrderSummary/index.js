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

// NextJS Material Dashboard 2 PRO components
import MDBox from "/src/components/MDBox";
import MDTypography from "/src/components/MDTypography";

function OrderSummary() {
  return (
    <>
      <MDBox mb={2}>
        <MDTypography variant="h6" fontWeight="medium">
          Order Summary
        </MDTypography>
      </MDBox>
      <MDBox display="flex" justifyContent="space-between" mb={0.5}>
        <MDTypography variant="button" fontWeight="regular" color="text">
          Product Price:
        </MDTypography>
        <MDBox ml={1}>
          <MDTypography variant="body2" fontWeight="medium">
            $90
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox display="flex" justifyContent="space-between" mb={0.5}>
        <MDTypography variant="button" fontWeight="regular" color="text">
          Delivery:
        </MDTypography>
        <MDBox ml={1}>
          <MDTypography variant="body2" fontWeight="medium">
            $14
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox display="flex" justifyContent="space-between" mb={0.5}>
        <MDTypography variant="button" fontWeight="regular" color="text">
          Taxes:
        </MDTypography>
        <MDBox ml={1}>
          <MDTypography variant="body2" fontWeight="medium">
            $1.95
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox display="flex" justifyContent="space-between" mt={3}>
        <MDTypography variant="body1" fontWeight="light" color="text">
          Total:
        </MDTypography>
        <MDBox ml={1}>
          <MDTypography variant="body1" fontWeight="medium">
            $1.95
          </MDTypography>
        </MDBox>
      </MDBox>
    </>
  );
}

export default OrderSummary;
