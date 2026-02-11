const checkingRole = async(req, res, next)=>{
    const role = req.user.role
    if(!role === "admin") return res.status(403).json({message: "forbidden, not allowed"})
    next()
}
export default checkingRole