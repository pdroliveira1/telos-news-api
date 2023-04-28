const jwt = require("jsonwebtoken") 

const { JWT_SECRET } = require('../config/env')

const { authorsDatabase } = require("./author.controller")
const { compareHash } = require("../utils/hashProvider")


const login = async (request, response) =>{
  const { email, password} = request.body

  const loginErrorMenssage = {
    error: '@authenticate/login',
    message: 'invalid email or password'
  }
  const author = authorsDatabase.find(a => a.email === email)
  

  if(!author){
    return response.status(400).json(loginErrorMenssage)
  }

  isValidPassword = await compareHash(password, author.password)

  if(!isValidPassword){
    return response.status(400).json(loginErrorMenssage)
  }

  const token = jwt.sign(author, JWT_SECRET, {
    expiresIn: "1h",
  })

  const authorAuthenticate = { ...author}

  delete authorAuthenticate.password

  return response.json({...authorAuthenticate, token})
}

module.exports = {
  login,
}