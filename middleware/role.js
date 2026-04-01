module.exports = function(requiredRole) {
    const roles = ['viewer', 'analyst', 'admin'];

    return (req, res, next) => {
        const userRoleIndex = roles.indexOf(req.user.role);
        const requiredRoleIndex = roles.indexOf(requiredRole);

        if (userRoleIndex < requiredRoleIndex) {
            return res.status(403).json({ msg: 'Access denied' });
        }
        next();
    };
};
