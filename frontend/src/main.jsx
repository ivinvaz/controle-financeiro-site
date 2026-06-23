import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler
} from "chart.js";

ChartJS.register(
  ArcElement,     
  Tooltip,     
  Legend,       
  LineElement,     
  PointElement, 
  LinearScale,    
  CategoryScale,
  Filler
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
