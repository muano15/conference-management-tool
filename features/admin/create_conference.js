const {createPool} = require("mysql");

const pool = createPool({
    host: 'localhost',
    user: 'muano',
    password: 'password',
    multipleStatements: true
})

const create_conference = (request, response) => {

    for (var i = 0; i < JSON.parse(request.body.organisers).length; i++) {
        console.log(JSON.parse(request.body.organisers)[i])
    }


    const sqlQuery1 = "INSERT INTO cmtdb.CONFERENCE (CONF_NAME, CONF_MODE) VALUES (?, ?);";
    var values1 = [request.body.name, request.body.mode];

    pool.query(sqlQuery1, values1, (error, result) => {
        if (error) {
            console.log(error)
            return;
        }
        else {
            var confId = result.insertId

            const sqlQuery2 = "INSERT INTO cmtdb.CONF_ROLE VALUES ( ?, ?, ?);";

            for (var i = 0; i < JSON.parse(request.body.organisers).length; i++) {
                var values2 = [confId, JSON.parse(request.body.organisers)[i], "organiser"]

                pool.query(sqlQuery2, values2, (error, result) => {
                    if (error) {
                        console.log(error)
                        return;
                    }
                    else {
                        return
                    }
                })
            }

            const sqlQuery3 = "INSERT INTO cmtdb.CONF_ROLE VALUES ( ?, ?, ?);";
            for (var i = 0; i < JSON.parse(request.body.areachairs).length; i++) {
                var values3 = [confId, JSON.parse(request.body.areachairs)[i], "areachair"]

                pool.query(sqlQuery3, values3, (error, result) => {
                    if (error) {
                        console.log(error)
                        return;
                    }
                    else {
                        return
                    }
                })
            }

            const sqlQuery4 = "INSERT INTO cmtdb.CONF_ROLE VALUES ( ?, ?, ?);";
            for (var i = 0; i < JSON.parse(request.body.reviewers).length; i++) {
                var values4 = [confId, JSON.parse(request.body.reviewers)[i], "reviewer"]

                pool.query(sqlQuery4, values4, (error, result) => {
                    if (error) {
                        console.log(error)
                        return;
                    }
                    else {
                        return
                    }
                })
            }
        }
    })
}

module.exports = {
    create_conference
}