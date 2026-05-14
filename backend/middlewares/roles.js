export const authorizedRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user._id)){
            return res.status(403).json({
                message: `Role '${req.user._id}'is not allowed to access this route`
            })
        }
        next();
    }
}

export const authorizeOwner = (Model, ownerField = 'author') => {
    return async (req, res, next) => {
        try {
            const resource = await Model.findById(req.params.id);

            if (!resource) {
                return res.status(404).json({
                    message: 'Resource not found'
                })
            }

            const isOwner = await resource[ownerField].toString() === req.user._id.toString();
            const isAdmin = req.user.role === 'admin';

            if (!isOwner && !isAdmin) {
                return res.status(403).json({
                    message: 'Not authorized to use this route'
                })
            }

            req.resource = resource;
            next();

        } catch (error) {
            return res.status(500).json({
               message: 'Server Error',
                error: error.message
            })
        }
    }
}