const userModel = require("./../model/userModel")
var jwt = require('jsonwebtoken');
const saltRounds = 10;
const secretKey = `mykey`

const ensureUser = async (req, res, next) => {
    token = req.headers.authorization.split(' ')[1] //get token from header
    console.log(token, `token`)
    if (token) {
        try {
            var decoded = jwt.verify(token, secretKey);
            if (decoded && decoded.id) {
                try {
                    let response = await userModel.getUserById(decoded.id) 
                    if (response.length > 0) {

                        req.userData = response //next if id stored in token matched with valid user id
                        return next()
                    }
                    else {
                        res.status(404).send(`User  not found`)

                    }

                }
                catch (e) {
                    console.log(e)
                    res.status(500).send(`User Id not found`)

                }

            } else {

                res.status(404).send(`User Id not found`)

            }
        }
        catch (e) {
            res.status(401).send(e)
        }

    } else {
        res.status(404).send(`Token not found`)
    }

}
module.exports = { ensureUser }


