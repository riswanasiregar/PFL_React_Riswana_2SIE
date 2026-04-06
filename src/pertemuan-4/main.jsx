import { createRoot } from "react-dom/client";
import "./tailwind.css";
import FrameworkList from "./FrameworkListSearchFilter";
import ResponsiveText from "./ResponsiveDesign";

createRoot(document.getElementById("root")).render(
  <div>
    {/* <FrameworkList /> */}
    <ResponsiveText />
  </div>
);