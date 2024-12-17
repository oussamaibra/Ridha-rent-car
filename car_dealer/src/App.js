import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import Header from "./Header";
import Footer from "./Footer";
import Listing from "./Listing";
import Contact from "./Contact";
import Details from "./Details";
import Financing from "./Financing";
import "./i18n";
import Booking from "./Booking";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listing" element={<Listing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/financing" element={<Financing />} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
