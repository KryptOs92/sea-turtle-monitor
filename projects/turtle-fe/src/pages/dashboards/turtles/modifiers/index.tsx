// NextJS Material Dashboard 2 PRO examples
import DashboardLayout from "../../../../examples/LayoutContainers/DashboardLayout";
import Footer from "../../../../examples/Footer";
import { SnackbarProvider } from "notistack";
import DashboardTurtle from "/src/examples/Navbars/DashboardTurtle";
import TurtleModifiersViewer from "../../../../components/TurtleModifiersViewer";
import { useMaterialUIController } from "../../../../context";

function TurtleModifiers() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <DashboardLayout>
      <SnackbarProvider maxSnack={3}>
        <DashboardTurtle />
        <TurtleModifiersViewer />
      </SnackbarProvider>
      <Footer />
    </DashboardLayout>
  );
}

export default TurtleModifiers;
