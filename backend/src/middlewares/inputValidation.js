import joi from "joi"

const signupSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().trim().min(8).required(),
    username: joi.string().trim().min(1).required(),
    role: joi.string()
})

const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().trim().min(8).required()
})

function validation(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false })

        if (error) return res.status(400).json({ error: error.details[0].message })

        next()
    }
}

export {
    validation,
    signupSchema,
    loginSchema

}