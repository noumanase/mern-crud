import jwt from "jsonwebtoken";

function handleApiResponse(res) {
  return res.status(401).json({ success: false, message: "Access denied!" });
}

function verifyJwt(req, res, next) {
  const header = req.headers["authorization"];
  if (!header) {
    handleApiResponse(res);
  }

  const token = header.split("Bearer ")[1];
  if (!token) {
    handleApiResponse(res);
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = user;
    next();
  } catch (error) {
    handleApiResponse(res);
  }
}

export default verifyJwt;
