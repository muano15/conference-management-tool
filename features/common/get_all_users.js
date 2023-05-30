const {createPool} = require("mysql");

const pool = createPool({
    host: '10.0.11.198',
    user: 'muano',
    password: 'password'
})

const get_all_users = (request, response) => {

    const sqlQuery1 = "SELECT * FROM cmtdb.USER;"

    pool.query(sqlQuery1, (error, result) => {
        if (error) {
            console.log(error)
        } else {
            let all_users_data = JSON.parse(JSON.stringify(result))

            response.json(all_users_data)
        }
    })
}

module.exports = {
    get_all_users
}