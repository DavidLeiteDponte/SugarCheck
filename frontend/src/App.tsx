import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ThemeWrapperContext from "./contexts/ThemeContext";
import Home from "./features/home";
import Login from "./features/login";

function App() {
  return (
    <ThemeWrapperContext>
      <Router>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </ThemeWrapperContext>
  );
}

export default App;