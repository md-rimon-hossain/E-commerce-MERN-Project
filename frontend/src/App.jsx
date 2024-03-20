/* eslint-disable no-unused-vars */

import React, {  useEffect, useState } from "react";

import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Container from "./components/Container";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false)
  }, [])
  

  return (
    <>
      {!loading ? (
        <div className="w-full h-screen bg-[#F5F5F5]">
          <Header />
          <div className="min-h-[90vh]">
            <Container>
              <Outlet />
            </Container>
          </div>
          <Footer />
        </div>
      ) : null}
    </>
  );
}

export default App;
