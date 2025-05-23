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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/src/components/MDBox";
import MDTypography from "/src/components/MDTypography";
import MDAvatar from "/src/components/MDAvatar";

function ProductCell({ image, name }) {
  return (
    <MDBox display="flex" alignItems="center" pr={2}>
      <MDBox mr={2}>
        <MDAvatar src={image.src || image} alt={name} />
      </MDBox>
      <MDTypography variant="button" fontWeight="medium">
        {name}
      </MDTypography>
    </MDBox>
  );
}

// Typechecking props for the ProductCell
ProductCell.propTypes = {
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  name: PropTypes.string.isRequired,
};

export default ProductCell;
