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
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/src/components/MDBox";
import MDTypography from "/src/components/MDTypography";
import MDAvatar from "/src/components/MDAvatar";
import MDButton from "/src/components/MDButton";

// Wizard application components
import FormField from "/src/pagesComponents/applications/wizard/components/FormField";

// Images
import team2 from "/src/assets/images/team-2.jpg";

function About() {
  return (
    <MDBox>
      <MDBox width="82%" textAlign="center" mx="auto" my={4}>
        <MDBox mb={1}>
          <MDTypography variant="h5" fontWeight="regular">
            Let&apos;s start with the basic information
          </MDTypography>
        </MDBox>
        <MDTypography variant="body2" color="text">
          Let us know your name and email address. Use an address you don&apos;t
          mind other users contacting you at
        </MDTypography>
      </MDBox>
      <MDBox mt={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} container justifyContent="center">
            <MDBox position="relative" height="max-content" mx="auto">
              <MDAvatar
                src={team2.src}
                alt="profile picture"
                size="xxl"
                variant="rounded"
              />
              <MDBox
                alt="spotify logo"
                position="absolute"
                right={0}
                bottom={0}
                mr={-1}
                mb={-1}
              >
                <Tooltip title="Edit" placement="top">
                  <MDButton
                    variant="gradient"
                    color="dark"
                    size="small"
                    iconOnly
                  >
                    <Icon>edit</Icon>
                  </MDButton>
                </Tooltip>
              </MDBox>
            </MDBox>
          </Grid>
          <Grid item xs={12} sm={8}>
            <MDBox mb={2}>
              <FormField type="text" label="First Name" />
            </MDBox>
            <MDBox mb={2}>
              <FormField type="text" label="Last Name" />
            </MDBox>
            <MDBox>
              <FormField type="email" label="Email Address" />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default About;
