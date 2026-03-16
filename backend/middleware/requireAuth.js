import jwt from "jsonwebtoken";

export const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) return res.status(401).json({error: 'Authorization token required'});

  const token = authorization.split(' ')[1]

  try {
    const { id, role } = jwt.verify(token, process.env.SECRET)

    req.user = { id, role };
    next()
  } catch (error) {
    console.log(error)
    res.status(401).json({error: 'Request is not authorized'})
  }
}

export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: 'Access denied: You do not have the required permissions' 
      });
    }
    next();
  };
};