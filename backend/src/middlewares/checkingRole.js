const checkingRole = async (req, res, next) => {
    const role = req.user.role

    if (!(role === "admin")) return res.status(403).json({ message: "forbidden, Only admins have access for this operation" })
    next()
}
export default checkingRole