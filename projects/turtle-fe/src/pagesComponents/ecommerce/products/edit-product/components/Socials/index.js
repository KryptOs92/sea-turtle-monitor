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
import Grid from "@mui/material/Grid";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/src/components/MDBox";
import MDTypography from "/src/components/MDTypography";

// EditProduct page components
import FormField from "/src/pagesComponents/ecommerce/products/edit-product/components/FormField";

function Socials() {
  return (
    <Card>
      <MDBox p={3}>
        <MDTypography variant="h5" fontWeight="bold">
          Socials
        </MDTypography>
        <MDBox mt={1}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormField
                type="text"
                label="Shoppify Handle"
                defaultValue="@soft"
              />
            </Grid>
            <Grid item xs={12}>
              <FormField
                type="text"
                label="Facebook Account"
                defaultValue="https://..."
              />
            </Grid>
            <Grid item xs={12}>
              <FormField
                type="text"
                label="Instagram Account"
                defaultValue="https://..."
              />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default Socials;
