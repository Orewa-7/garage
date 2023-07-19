import jwt from "jsonwebtoken";

export const isAdmin = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(200).json({ isAdmin: false });

    jwt.verify(token, "admin", (err, userInfo) => {
        if (err) {
            return res.status(200).json({ isAdmin: false });
        } else {
            return res.status(200).json({ isAdmin: true });
        }
    });
};