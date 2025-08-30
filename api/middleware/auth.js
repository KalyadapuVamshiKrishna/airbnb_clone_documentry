import jwt from "jsonwebtoken"

export const jwtSecret = process.env.JWT_SECRET;

export const requireAuth = (req, res, next) =>{
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).send("Unauthorized");
    }

    jwt.verify(req,res, (err,userData)=>{
        if (err) return res.status(401).json({error: "Invalid Token"});

        req.user = userData;
        next();
    });
}