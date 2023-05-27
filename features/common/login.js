const {createPool} = require("mysql");
const {createHash} = require("crypto")

const pool = createPool({
    host: 'localhost',
    user: 'muano',
    password: 'password'
})


function hash(pword) {
    return createHash('sha256').update(pword).digest('hex')
}

const login_user = (request, response) => {

    var hashedPword = hash(request.body.pword.toString())

    const sqlQuery1 = "SELECT * FROM cmtdb.USER WHERE USER_EMAIL = ? AND USER_PWORD = ?;"
    const values = [request.body.email, hashedPword];

    pool.query(sqlQuery1, values, (error, result) => {
        if (error) {
            console.log(error)
        }
        else {
            if (result.length == 1) {
                response.sendStatus(200)
            }
            else {
                response.sendStatus(401)
            }
        }
    })
}

module.exports = {
    login_user
}