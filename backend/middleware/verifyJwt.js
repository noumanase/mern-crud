import jwt from "jsonwebtoken";

function verifyJwt(req, res, next) {
  const header = req.headers["authorization"];
  if (header) {
    try {
      const token = header.split("Bearer ")[1];
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);

      console.log("user:::::", user);

      if (user) {
        req.user = user;
        return next();
      }
    } catch (error) {
      console.log("====erroro: ", error);
      return res.status(401).json({ success: false, message: "Access denied" });
    }
  } else {
    console.log("====erroro:2 ", error);

    return res.status(401).json({ success: false, message: "Access denied" });
  }
}

export default verifyJwt;
