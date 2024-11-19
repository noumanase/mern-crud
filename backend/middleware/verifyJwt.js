import jwt from "jsonwebtoken";

function verifyJwt(req, res, next) {
  const header = req.headers["authorization"];
  if (!header) {
    handleApiResponse(res);
    return;
  }

  const token = header.split("Bearer ")[1];
  if (!token) {
    handleApiResponse(res);
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = user;
    next();
  } catch (error) {
    handleApiResponse(res);
  }
}

function handleApiResponse(res) {
  return res.status(401).json({ success: false, message: "Access denied!" });
}

export default verifyJwt;
