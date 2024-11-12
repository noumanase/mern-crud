import jwt from "jsonwebtoken";

function verifyJwt(req, res, next) {
  const header = req.headers["authorization"];
  if (!header) {
    return res
      .status(401)
      .json({ success: false, message: "Access denied, no token provided" });
  }

  const token = header.split("Bearer ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Access denied, malformed token" });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Access denied, invalid token" });
  }
}

export default verifyJwt;
