import { useEffect } from "react";
import Products from "./components/Products";
import CreateProduct from "./components/CreateProduct";
import { isTokenExpired } from "./utils";
import "./App.css";

function App() {
  const tokenExpired = isTokenExpired();

  useEffect(() => {
    if (tokenExpired) {
      localStorage.clear();
      window.location.reload();
    }
  }, [localStorage.getItem("authToken")]);

  return (
    <>
      <Products />
      <CreateProduct />
    </>
  );
}

export default App;
