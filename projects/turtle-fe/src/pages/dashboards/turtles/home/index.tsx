// NextJS Material Dashboard 2 PRO examples
import DashboardLayout from "../../../../examples/LayoutContainers/DashboardLayout";
import Footer from "../../../../examples/Footer";
import { SnackbarProvider } from "notistack";
import DashboardTurtle from "/src/examples/Navbars/DashboardTurtle";
import TurtleAdministration from "/src/components/TurtleAdministration";


function TurtleHome() {


  return (
    <DashboardLayout>
      <SnackbarProvider maxSnack={3}>
          <DashboardTurtle />
          <TurtleAdministration />
      </SnackbarProvider>
      <Footer />
    </DashboardLayout>
  );
}

export default TurtleHome;
