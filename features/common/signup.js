const {createPool} = require("mysql");
const {createHash} = require("crypto");

const pool = createPool({
    host: 'localhost',
    user: 'muano',
    password: 'password'
})

function hash(pword) {
    return createHash('sha256').update(pword).digest('hex')
}

const create_user = (request, response) => {

    const sqlQuery1 = "INSERT INTO cmtdb.USER(USER_NAME,USER_EMAIL,USER_EXPERTISE,USER_DOMAIN,USER_PWORD) VALUES(?, ?, ?, ?, ?);"
    const values = [request.body.name, request.body.email, request.body.expertise, request.body.domain, hash(request.body.pword.toString())];

    pool.query(sqlQuery1, values, (error, result) => {
        if (error) {
            console.log(error)
        }
        else {
            response.status(200).send("user created")
        }
    })

}

module.exports = {
    create_user
}