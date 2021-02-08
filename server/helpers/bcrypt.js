const bcrypt = require("bcryptjs")

function hash(input) {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(input,salt)
  return hash
}

function compare(input, hash) {
  return bcrypt.compareSync(input, hash)
}

module.exports = {
  hash,
  compare
}