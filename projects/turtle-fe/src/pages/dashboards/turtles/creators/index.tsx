// NextJS Material Dashboard 2 PRO examples
import DashboardLayout from "../../../../examples/LayoutContainers/DashboardLayout";
import Footer from "../../../../examples/Footer";
import { SnackbarProvider } from "notistack";
import DashboardTurtle from "/src/examples/Navbars/DashboardTurtle";
import TurtleCreatorsViewer from "../../../../components/TurtleCreatorsViewer";
import { useMaterialUIController } from "../../../../context";

function TurtleCreators() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <DashboardLayout>
      <SnackbarProvider maxSnack={3}>
        <DashboardTurtle />
        <TurtleCreatorsViewer />
      </SnackbarProvider>
      <Footer />
    </DashboardLayout>
  );
}

export default TurtleCreators;
