const { compare, hash } =   require('bcryptjs')

const generateHash = async (password) => {
  return hash(password, 8)
}  

const compareHash = async (password, hashedPassword) => {
  return compare(password, hashedPassword)
}

module.exports = {
  generateHash,
  compareHash,
}