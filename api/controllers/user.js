import jwt from "jsonwebtoken";

export const isAdmin = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "admin", (err, userInfo) => {
        if (err){
            jwt.verify(token, "employe", (err, userInfo) => {
                if (err) return res.status(403).json("Token is not valid!");
                return res.status(200).json({isAdmin: false});
                
            });
        } else {
            return res.status(200).json({isAdmin: true});
        }
    });
};