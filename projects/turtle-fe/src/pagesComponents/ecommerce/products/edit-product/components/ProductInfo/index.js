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
import Card from "@mui/material/Card";
import Autocomplete from "@mui/material/Autocomplete";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/src/components/MDBox";
import MDTypography from "/src/components/MDTypography";
import MDEditor from "/src/components/MDEditor";
import MDInput from "/src/components/MDInput";

// NewProduct page components
import FormField from "/src/pagesComponents/ecommerce/products/edit-product/components/FormField";

function ProductInfo() {
  return (
    <Card>
      <MDBox p={3}>
        <MDTypography variant="h5">Product Information</MDTypography>
        <MDBox mt={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormField
                type="text"
                label="Name"
                defaultValue="Minimal Bar Stool"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField type="number" label="Weight" defaultValue={2} />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mt={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3}>
              <FormField type="text" label="Collection" defaultValue="Summer" />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormField type="text" label="Price" defaultValue="$90" />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormField type="number" label="Quantity" defaultValue={50} />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mt={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <MDBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                <MDTypography
                  component="label"
                  variant="button"
                  fontWeight="regular"
                  color="text"
                >
                  Description&nbsp;&nbsp;
                  <MDTypography
                    variant="caption"
                    fontWeight="regular"
                    color="text"
                  >
                    (optional)
                  </MDTypography>
                </MDTypography>
              </MDBox>
              <MDEditor />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MDBox mb={3}>
                <MDBox mb={1.625} display="inline-block">
                  <MDTypography
                    component="label"
                    variant="button"
                    fontWeight="regular"
                    color="text"
                    textTransform="capitalize"
                  >
                    Category
                  </MDTypography>
                </MDBox>
                <Autocomplete
                  defaultValue="Clothing"
                  options={[
                    "Clothing",
                    "Electronics",
                    "Furniture",
                    "Others",
                    "Real Estate",
                  ]}
                  renderInput={(params) => (
                    <MDInput {...params} variant="standard" />
                  )}
                />
              </MDBox>
              <MDBox mb={1.625} display="inline-block">
                <MDTypography
                  component="label"
                  variant="button"
                  fontWeight="regular"
                  color="text"
                  textTransform="capitalize"
                >
                  Color
                </MDTypography>
              </MDBox>
              <Autocomplete
                defaultValue="Black"
                options={["Black", "Blue", "Green", "Orange", "White"]}
                renderInput={(params) => (
                  <MDInput {...params} variant="standard" />
                )}
              />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default ProductInfo;
