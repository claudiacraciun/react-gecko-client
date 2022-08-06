import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import NavbarHeader from "./components/navbarHeader/navbarHeader";
import Details from "./pages/details";
import "./App.css";


function App() {
  return (
    <BrowserRouter>
      <NavbarHeader />
      <main>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;