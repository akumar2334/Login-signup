const userModel = require("./../model/userModel")

const login = (req, res) => { //login function
    let email = req.body.email
    let password = req.body.password
    if (email && password) {
        userModel.login(email, password)
            .then((response) => {
                if (response) {
                    res.status(200).send(response)
                } else {
                    res.status(404).send(`User not found`)
                }
            })
            .catch((e) => {
                console.log(e)
                res.status(401).send(e)
            })

    } else {
        res.status(400).send(`email  and password are mandatory `)
    }
    //  userModel.login()
}

const signup = (req, res) => {
    if (req.body.email && req.body.password && req.body.phone && req.body.name) {

        userModel.checkIsEmailAlready(req.body.email) //check if email Address is  present or not
            .then((result) => {
                if (result.length > 0) {
                    res.status(400).send(`Email already Exist`)
                }
                else {
                    userModel.signup(req.body) //store user details in db
                        .then((response) => {
                            res.status(201).send(`Successfully signup `)
                        }).catch((e) => {
                            console.log(e)
                            res.status(500).send(e)
                        })

                }

            })
            .catch((e) => {
                console.log(e)
                res.status(500).send(`Something went worong`)
            })
    }
    else {
        res.status(400).send(`All fields are important`)

    }


}

const update = (req, res) => {
    if (req.body.email && req.body.name) {
        userModel.checkIsEmailAlreadWithId(req.body.email, req.body.id)
            // check for email address if any user using having same updated email other then current logged in user
            .then((result) => {
                if (result.length > 0) {
                    res.status(400).send(`Email Already Exist`)
                } else {
                    userModel.updateUser(req.body) //store updated details in db
                        .then((result) => {
                            res.status(200).send(`updated`)

                        }).catch((e1) => {
                            console.log(e1)
                            res.status(500).send(`something went wrong`)

                        })
                }

            })
            .catch((e) => {
                console.log(e)
                res.status(500).send(`something went wrong`)
            })
    } else {
        res.status(500).send(`email and name are mandatory `)

    }



}


module.exports = {
    login, signup, update
}