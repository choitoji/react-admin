import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import {Routes, Route} from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Students from "./scenes/students";
import Form from "./scenes/form";
import Calendar from "./scenes/calendar";
import Bar from "./scenes/bar";
import Pie from "./scenes/pie";

function App() {
  const[theme, colorMode] = useMode();

  return (
  <ColorModeContext.Provider value = {colorMode}>
    <ThemeProvider theme = {theme}>
      <CssBaseline />
      <div className="app">
        <Sidebar />
        <main className="content">
          <Topbar />
          <Routes>
            <Route path ="/" element ={<Dashboard />} />
            {/* <Route path ="/team" element ={<Team />} /> */}
            <Route path ="/students" element ={<Students />} />
            <Route path ="/add-student" element ={<Form />} />
            <Route path ="/calendar" element ={<Calendar />} />
            <Route path ="/bar" element ={<Bar />} />
            <Route path ="/pie" element ={<Pie />} />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  </ColorModeContext.Provider>  
  );
}

export default App;
