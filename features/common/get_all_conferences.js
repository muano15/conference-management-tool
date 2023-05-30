const {createPool} = require("mysql");
const e = require("express");

const pool = createPool({
    host: '10.0.11.198',
    user: 'muano',
    password: 'password'
})

const get_all_conferences = (request, response) => {

    const sqlQuery = "SELECT * FROM cmtdb.CONFERENCE;"

    pool.query(sqlQuery, (error, result) => {
        if (error) {
            console.log(error)
        } else {
            let all_conferences = JSON.parse(JSON.stringify(result))

            response.json(all_conferences)
        }
    })
}

module.exports = {
    get_all_conferences
}