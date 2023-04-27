const jwt = require("jsonwebtoken")

const verifyAuthenticate = (request, response, next) => {
  const { authorization } = request.headers

  if(!authorization){
    return response.status(401).json({
      error: "@authenticate/missing-token",
      message: "Token not sent"
    })
  }

  const [prefix, token] = authorization.split(" ")

  const invalidTokenMessage = {
    error: "@authenticate/invalid-token",
    message: "Token provided is invalid"
  }

  if(prefix !== "Bearer"){
    return response.status(401).json(invalidTokenMessage)
  }

  if(!token){
    return response.status(401).json(invalidTokenMessage)
  }

  jwt.verify(token, "secret", (err, decoded) => {
    if(err){
      return response.status(401).json(invalidTokenMessage)
    }

    request.author = decoded

    return next()

  })
}

module.exports = {
  verifyAuthenticate,
}