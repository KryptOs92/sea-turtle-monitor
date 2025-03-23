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
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/src/components/MDBox";
import MDTypography from "/src/components/MDTypography";

// NextJS Material Dashboard 2 PRO examples
import DashboardLayout from "/src/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "/src/examples/Navbars/DashboardNavbar";
import Footer from "/src/examples/Footer";
import ReportsBarChart from "/src/examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "/src/examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "/src/examples/Cards/StatisticsCards/ComplexStatisticsCard";
import BookingCard from "/src/examples/Cards/BookingCard";

// Anaytics dashboard components
import SalesByCountry from "/src/pagesComponents/dashboards/analytics/components/SalesByCountry";

// Data
import reportsBarChartData from "/src/pagesComponents/dashboards/analytics/data/reportsBarChartData";
import reportsLineChartData from "/src/pagesComponents/dashboards/analytics/data/reportsLineChartData";

// Images
import booking1 from "/src/assets/images/products/product-1-min.jpg";
import booking2 from "/src/assets/images/products/product-2-min.jpg";
import booking3 from "/src/assets/images/products/product-3-min.jpg";

function TurtleOverview() {
  const { sales, tasks } = reportsLineChartData;

  // Action buttons for the BookingCard
  const actionButtons = (
    <>
      <Tooltip title="Refresh" placement="bottom">
        <MDTypography
          variant="body1"
          color="primary"
          lineHeight={1}
          sx={{ cursor: "pointer", mx: 3 }}
        >
          <Icon color="inherit">refresh</Icon>
        </MDTypography>
      </Tooltip>
      <Tooltip title="Edit" placement="bottom">
        <MDTypography
          variant="body1"
          color="dark"
          lineHeight={1}
          sx={{ cursor: "pointer", mx: 3 }}
        >
          <Icon color="inherit">edit</Icon>
        </MDTypography>
      </Tooltip>
    </>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>


        <MDBox mt={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mt={3}>
                <BookingCard
                  image={booking1}
                  title="Cozy 5 Stars Apartment"
                  description='The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the main night life in Barcelona.'
                  price="$899/night"
                  location="Barcelona, Spain"
                  action={actionButtons}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mt={3}>
                <BookingCard
                  image={booking2}
                  title="Office Studio"
                  description='The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the night life in London, UK.'
                  price="$1.119/night"
                  location="London, UK"
                  action={actionButtons}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mt={3}>
                <BookingCard
                  image={booking3}
                  title="Beautiful Castle"
                  description='The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the main night life in Milan.'
                  price="$459/night"
                  location="Milan, Italy"
                  action={actionButtons}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default TurtleOverview;
