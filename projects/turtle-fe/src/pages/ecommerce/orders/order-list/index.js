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
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/src/components/MDBox";
import MDTypography from "/src/components/MDTypography";
import MDButton from "/src/components/MDButton";

// NextJS Material Dashboard 2 PRO examples
import DashboardLayout from "/src/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "/src/examples/Navbars/DashboardNavbar";
import Footer from "/src/examples/Footer";
import DataTable from "/src/examples/Tables/DataTable";

// Data
import dataTableData from "/src/pagesComponents/ecommerce/orders/order-list/data/dataTableData";

function OrderList() {
  const [menu, setMenu] = useState(null);

  const openMenu = (event) => setMenu(event.currentTarget);
  const closeMenu = () => setMenu(null);

  const renderMenu = (
    <Menu
      anchorEl={menu}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      open={Boolean(menu)}
      onClose={closeMenu}
      keepMounted
    >
      <MenuItem onClick={closeMenu}>Status: Paid</MenuItem>
      <MenuItem onClick={closeMenu}>Status: Refunded</MenuItem>
      <MenuItem onClick={closeMenu}>Status: Canceled</MenuItem>
      <Divider sx={{ margin: "0.5rem 0" }} />
      <MenuItem onClick={closeMenu}>
        <MDTypography variant="button" color="error" fontWeight="regular">
          Remove Filter
        </MDTypography>
      </MenuItem>
    </Menu>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox my={3}>
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          mb={2}
        >
          <MDButton variant="gradient" color="dark">
            new order
          </MDButton>
          <MDBox display="flex">
            <MDButton
              variant={menu ? "contained" : "outlined"}
              color="dark"
              onClick={openMenu}
            >
              filters&nbsp;
              <Icon>keyboard_arrow_down</Icon>
            </MDButton>
            {renderMenu}
            <MDBox ml={1}>
              <MDButton variant="outlined" color="dark">
                <Icon>description</Icon>
                &nbsp;export csv
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
        <Card>
          <DataTable table={dataTableData} entriesPerPage={false} canSearch />
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default OrderList;
