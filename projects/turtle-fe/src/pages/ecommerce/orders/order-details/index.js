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
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/src/components/MDBox";

// NextJS Material Dashboard 2 PRO examples
import DashboardLayout from "/src/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "/src/examples/Navbars/DashboardNavbar";
import Footer from "/src/examples/Footer";

// OrderDetails page components
import Header from "/src/pagesComponents/ecommerce/orders/order-details/components/Header";
import OrderInfo from "/src/pagesComponents/ecommerce/orders/order-details/components/OrderInfo";
import TrackOrder from "/src/pagesComponents/ecommerce/orders/order-details/components/TrackOrder";
import PaymentDetails from "/src/pagesComponents/ecommerce/orders/order-details/components/PaymentDetails";
import BillingInformation from "/src/pagesComponents/ecommerce/orders/order-details/components/BillingInformation";
import OrderSummary from "/src/pagesComponents/ecommerce/orders/order-details/components/OrderSummary";

function OrderDetails() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox my={6}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card>
              <MDBox pt={2} px={2}>
                <Header />
              </MDBox>
              <Divider />
              <MDBox pt={1} pb={3} px={2}>
                <MDBox mb={3}>
                  <OrderInfo />
                </MDBox>
                <Divider />
                <MDBox mt={3}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={3}>
                      <TrackOrder />
                    </Grid>
                    <Grid item xs={12} md={6} lg={5}>
                      <PaymentDetails />
                      <MDBox mt={3}>
                        <BillingInformation />
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} lg={3} sx={{ ml: "auto" }}>
                      <OrderSummary />
                    </Grid>
                  </Grid>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default OrderDetails;
