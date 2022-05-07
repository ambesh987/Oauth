const JWTService = require('../CommonLib/JWTtoken');
const tokenModel = require('../Models/token');

async function isValidToken(req, res, next) {
    try {
        const token = req.headers.token;
        if (token) {
            JWTService.verifyToken(token);
            //verification token in db
            const result = await tokenModel.findOne({ token });
            if (result) {
                next();
            } else {
                res.json({ status: "failed", message: "Token is not present in DB" });
            }
        } else {
            res.json({ status: "failed", message: "Token is not present in header" });

        }


    } catch (error) {
        res.json(error);
    }
}

function isSuperAdmin(req, res, next) {
    try {
        const token = req.headers.token;
        const response = JWTService.verifyToken(token);

        if (response.roleName !== 'SUPERADMIN') {
            res.json({ message: "User is not super admin.Only super admin can access this route" });
        }

        next();
    } catch (error) {
        res.json(error);
    }
}
function isAdmin(req, res, next) {
    try {
        const token = req.headers.token;
        const response = JWTService.verifyToken(token);

        if (response.roleName !== 'ADMIN') {
            res.json({ message: "User is not Admin.Only Admin can access this route" });
        }

        next();
    } catch (error) {
        res.json(error);
    }
}



module.exports = {
    isValidToken,
    isSuperAdmin,
    isAdmin
}
