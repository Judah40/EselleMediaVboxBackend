const crypto = require("crypto")

exports.randomName = (bytes= 32)=>crypto.randomBytes(bytes).toString("hex")