import React from "react";
import { Route, Routes } from "react-router-dom";
import AllEvents from "./pages/AllEvents";
import AddEvent from "./pages/AddEvent";
import Favorites from "./pages/Favorites";
import MainNav from "./components/MainNav";

function App() {
  return (
    <>
      <MainNav />
      <Routes>
        <Route path="/" element={<AllEvents />}></Route>
        <Route path="/favorites" element={<Favorites />}></Route>
        <Route path="/add-event" element={<AddEvent />}></Route>
      </Routes>
    </>
  );
}

export default App;
