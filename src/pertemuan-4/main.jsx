import { createRoot } from "react-dom/client";
import "./tailwind.css";
import FrameworkList from "./FrameworkListSearchFilter";

createRoot(document.getElementById("root")).render(
  <div>
    <FrameworkList />
  </div>
);