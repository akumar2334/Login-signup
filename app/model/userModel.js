const conn = require("./../db/dbConfig")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const saltRounds = 10;
const secretKey = `mykey`



const login = (email, password) => {
    return new Promise((resolve, reject) => {

        conn.query(`select token,password from user where email='${email}'`, (err, resultOfUser) => {
            if (err) {
                reject(err)
                console.log(err)
            }
            else {
                if (resultOfUser.length < 1) {
                    reject(`Wrong Email ID`)
                } else {

                    bcrypt.compare(password, resultOfUser[0].password, function (err, result) {
                        if (err) {
                            console.log(err)
                        }
                        if (result) {
                            resolve({ token: resultOfUser[0].token })
                        } else {
                            reject(`Wrong Password`)
                        }
                        // result == true
                    });
                }
            }
        })
    })

}

const checkIsEmailAlready = (email) => {
    return new Promise((resolve, reject) => {
        conn.query(`select id from user where email='${email}'`, (err, result) => {
            if (err) {
                reject(err)
                console.log(err)
            }
            else (
                resolve(result)
            )
        })
    })
}
const signup = (data) => {
    let insertedId
    return new Promise((resolve, reject) => {
        bcrypt.hash(data.password, saltRounds, function (err, hash) {
            // Store hash in your password DB.
            conn.query(`insert into user (name,email,phone,password) value("${data.name}","${data.email}","${data.phone}","${hash}")`, (err, result) => {
                if (err) {
                    reject(err)
                    console.log(err)
                }
                else {
                    insertedId = result.insertId
                    var token = jwt.sign({ id: insertedId }, secretKey);
                    conn.query(`update user set token="${token}" where id=${insertedId}`, (errInStoringToken, resultOfStoringToken) => {
                        if (errInStoringToken) reject(errInStoringToken)
                        else {
                            resolve(token)
                        }
                    })
                }
            })
        });
    })
}


const getUserById = (id) => {
    return new Promise((resolve, reject) => {

        conn.query(`select * from user where id=${id}`, (err, result) => {
            if (err) {
                reject(err)
                console.log(err)
            }
            else {
                resolve(result)
            }
        })
    })
}

const checkIsEmailAlreadWithId = (email, id) => {
    return new Promise((resolve, reject) => {
        conn.query(`select id from user where email='${email}' and id !='${id}'`, (err, result) => {
            if (err) {
                reject(err)
                console.log(err)
            }
            else {
                resolve(result)
            }
        })
    })
}

const updateUser = (data) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(data.password, saltRounds, function (err, hash) {
            if (err) {
                reject(`Something went Wrong`)
                console.log(err)
            } else {
                let queryStr = `update user set name='${data.name}', email='${data.email}',phone='${data.phone}'`
                if (data.flag) {
                    // flag to check if password is changed or not if without checking this it will hash password again and we won`t we able to login
                    queryStr += `,password="${hash}"`
                }
                conn.query(queryStr + ` where id='${data.id}'`, (err, result) => {
                    if (err) reject(err)
                    else {
                        resolve(result)
                    }
                })
            }
        })
    })
}

module.exports = { login, updateUser, signup, checkIsEmailAlready, checkIsEmailAlreadWithId, getUserById }