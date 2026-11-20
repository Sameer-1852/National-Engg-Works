const adminOnly = (req, res, next) => {
  const role = (req.user?.role || "").toLowerCase();
  if (role === "admin" || role === "author" || role === "manager") {
    return next();
  }
  return res.status(403).json({
    success: false,
    message: "Access denied. Administrator or Author privileges required.",
  });
};

module.exports = { adminOnly };
