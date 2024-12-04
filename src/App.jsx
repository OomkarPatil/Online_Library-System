import { Toaster } from "react-hot-toast";
import NavBar from "./components/NavBar";
import { Outlet } from "react-router"

function App() {
  return (
    <>
      <NavBar/>
      <Outlet />
      <Toaster />
    </>
  );
}

export default App;