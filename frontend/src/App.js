import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import pages
import Home from "./Pages/Home";
import Table from "./Pages/Table";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/table" element={<Table />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
