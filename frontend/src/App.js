import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import pages
import Home from "./Pages/Home";
import Table from "./Pages/Table";
import Login from "./Pages/Login";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(JSON.parse(localStorage.getItem("user")) || null);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              user ? <Home setUser={setUser} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/table"
            element={
              user ? <Table setUser={setUser} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login setUser={setUser} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
