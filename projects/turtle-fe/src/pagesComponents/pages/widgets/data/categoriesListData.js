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
import MDTypography from "/src/components/MDTypography";

const categoriesListData = [
  {
    color: "dark",
    icon: "launch",
    name: "Devices",
    description: (
      <>
        250 in stock,{" "}
        <MDTypography variant="caption" color="text" fontWeight="medium">
          346+ sold
        </MDTypography>
      </>
    ),
    route: "/",
  },
  {
    color: "dark",
    icon: "book_online",
    name: "Tickets",
    description: (
      <>
        123 closed,{" "}
        <MDTypography variant="caption" color="text" fontWeight="medium">
          15 open
        </MDTypography>
      </>
    ),
    route: "/",
  },
  {
    color: "dark",
    icon: "priority_high",
    name: "Error logs",
    description: (
      <>
        1 is active,{" "}
        <MDTypography variant="caption" color="text" fontWeight="medium">
          40 closed
        </MDTypography>
      </>
    ),
    route: "/",
  },
  {
    color: "dark",
    icon: "insert_emoticon",
    name: "Happy users",
    description: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        + 430
      </MDTypography>
    ),
    route: "/",
  },
];

export default categoriesListData;
