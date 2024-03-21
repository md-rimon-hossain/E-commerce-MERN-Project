
import  {  useEffect, useState } from "react";

import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Container from "./components/Container";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/api/auth/refresh-token");
        const userData = response.data.payload
        if (response.data.success) {
          const response = await axios.get("/api/auth/protected")
          if(response.data.success){
            dispatch(login(userData));
          }
        }
        setLoading(false);
      } catch (error) {
        console.log(error)
        dispatch(logout());
        setLoading(false);
      }
    })();
    
  }, []);

  return (
    <>
      {!loading ? (
        <div className="w-full min-h-[90vh] bg-[#ffffff]">
          <Header />
          <div className="min-h-[90vh]">
            <Container>
              <Outlet />
            </Container>
          </div>
          <Footer />
        </div>
      ) : <div className="w-full h-screen flex items-center justify-center"><h2>Loading...</h2></div>}
    </>
  );
}

export default App;
