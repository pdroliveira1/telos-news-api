const jwt = require("jsonwebtoken") 
const { authorsDatabase } = require("../controllers/autor.controller")
const { compareHash } = require("../utils/hashProvider")

const login = async (request, response) =>{
  const { email, password} = request.body

  const loginErrorMenssage = {
    error: '@authenticate/login',
    message: 'invalid email or password'
  }

  const author2 = authorsDatabase.find(a => a.email === email)
  const author = authorsDatabase.find(a => a.email === email)
  

  if(!author){
    return response.status(400).json(loginErrorMenssage)
  }

  isValidPassword = await compareHash(password, author.password)

  if(!isValidPassword){
    return response.status(400).json(loginErrorMenssage)
  }

  const token = jwt.sign(author, "secret", {
    expiresIn: "1h",
  })

  delete author.password

  console.log(author2.password)

  return response.json({...author, token})
}

module.exports = {
  login,
}