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
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/src/components/MDBox";
import MDTypography from "/src/components/MDTypography";
import MDAvatar from "/src/components/MDAvatar";
import MDButton from "/src/components/MDButton";

// Image
import team1 from "/src/assets/images/team-1.jpg";
import team2 from "/src/assets/images/team-2.jpg";
import team3 from "/src/assets/images/team-3.jpg";
import team4 from "/src/assets/images/team-4.jpg";
import team5 from "/src/assets/images/team-5.jpg";

function Header() {
  const avatarStyles = {
    border: ({ borders: { borderWidth }, palette: { white } }) =>
      `${borderWidth[2]} solid ${white.main}`,
    cursor: "pointer",
    position: "relative",
    ml: -1.5,

    "&:hover, &:focus": {
      zIndex: "10",
    },
  };

  return (
    <MDBox display="flex" alignItems="center">
      <MDBox mt={0.5} pr={1}>
        <MDBox mb={1} ml={-1.25} lineHeight={0}>
          <MDTypography variant="button" color="secondary">
            Team members:
          </MDTypography>
        </MDBox>
        <MDBox display="flex">
          <Tooltip title="Jessica Rowland" placement="top">
            <MDAvatar
              src={team1.src}
              alt="team-1"
              size="sm"
              sx={avatarStyles}
            />
          </Tooltip>
          <Tooltip title="Audrey Love" placement="top">
            <MDAvatar
              src={team2.src}
              alt="team-1"
              size="sm"
              sx={avatarStyles}
            />
          </Tooltip>
          <Tooltip title="Michael Lewis" placement="top">
            <MDAvatar
              src={team3.src}
              alt="team-1"
              size="sm"
              sx={avatarStyles}
            />
          </Tooltip>
          <Tooltip title="Lucia Linda" placement="top">
            <MDAvatar
              src={team4.src}
              alt="team-1"
              size="sm"
              sx={avatarStyles}
            />
          </Tooltip>
          <Tooltip title="Ronald Miller" placement="top">
            <MDAvatar
              src={team5.src}
              alt="team-1"
              size="sm"
              sx={avatarStyles}
            />
          </Tooltip>
        </MDBox>
      </MDBox>
      <MDBox height="75%" alignSelf="flex-end">
        <Divider orientation="vertical" />
      </MDBox>
      <MDBox pl={1}>
        <MDButton variant="outlined" color="dark" iconOnly>
          <Icon sx={{ fontWeight: "bold" }}>add</Icon>
        </MDButton>
      </MDBox>
    </MDBox>
  );
}

export default Header;
