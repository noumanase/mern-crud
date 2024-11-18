import { jwtDecode } from "jwt-decode";

export const isTokenExpired = () => {
  const token = localStorage.getItem("authToken");
  if (!token) return true;
  const decoded = jwtDecode(token);
  console.log("decoded token: ", decoded);
  const currentTime = Date.now() / 1000;

  return decoded.exp < currentTime;
};
