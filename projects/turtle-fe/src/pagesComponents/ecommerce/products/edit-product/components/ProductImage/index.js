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

import Image from "next/image";

// @mui material components
import Card from "@mui/material/Card";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/src/components/MDBox";
import MDTypography from "/src/components/MDTypography";
import MDButton from "/src/components/MDButton";

// Images
import productImage from "/src/assets/images/products/product-11.jpg";

function ProductImage() {
  return (
    <Card
      sx={{
        "&:hover .card-header": {
          transform: "translate3d(0, -50px, 0)",
        },
      }}
    >
      <MDBox
        position="relative"
        borderRadius="lg"
        mt={-3}
        mx={2}
        className="card-header"
        sx={{ transition: "transform 300ms cubic-bezier(0.34, 1.61, 0.7, 1)" }}
      >
        <MDBox
          borderRadius="lg"
          shadow="sm"
          width="100%"
          height="100%"
          position="relative"
          zIndex={10}
          mb={2}
          overflow="hidden"
        >
          <Image
            src={productImage}
            alt="Product Image"
            sizes="100%"
            style={{ width: "100%", height: "100%", display: "block" }}
          />
        </MDBox>
      </MDBox>
      <MDBox textAlign="center" pt={2} pb={3} px={3}>
        <MDBox
          display="flex"
          justifyContent="center"
          alignItems="center"
          mt={-10}
          position="relative"
          zIndex={1}
        >
          <MDBox mr={1}>
            <MDButton variant="gradient" color="dark" size="small">
              edit
            </MDButton>
          </MDBox>
          <MDButton variant="outlined" color="error" size="small">
            remove
          </MDButton>
        </MDBox>
        <MDTypography variant="h5" fontWeight="regular" sx={{ mt: 4 }}>
          Product Image
        </MDTypography>
        <MDTypography variant="body2" color="text" sx={{ mt: 1.5, mb: 1 }}>
          The place is close to Barceloneta Beach and bus stop just 2 min by
          walk and near to &#8220;Naviglio&#8221; where you can enjoy the main
          night life in Barcelona.
        </MDTypography>
      </MDBox>
    </Card>
  );
}

export default ProductImage;
