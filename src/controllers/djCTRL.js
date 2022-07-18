let db = require("../model/db")


// Function to return a summary of the dj on the response
let djSummary = function (req, res) {
    console.log("DJSummary");

    let sql = "select * from djs";
    db.query(sql, function (err, results) {
        if (err) {
            // handle the err
            console.log("could not execute the query", err);
            res.sendStatus(400);
        } else {
            res.json(results);
        }
    })
};
// function to return the detail of a single dj on the response
let djDetails = function (req, res) {
    console.log("djDetails");

    let id = req.params.id;

    // when a sql statement uses a ?, this is called parameterized SQL
    let sql = "select user_id, name, email, description, zipcode from djs where id = ?";
    let params = []; // this array will hold the params for our sql statement
    params.push(id) // this is the first param in the sql statement

    //  bad way, subtle to sql injection, please do not do this !!!!!!!!!
    // let badSql = "select id, first_name, last_name, description from users2 where id = " +id;

    db.query(sql, params, function (err, results) {
        if (err) {
            console.log("failed to execute query:", err);
            res.sendStatus(500); // it is not the clients fault the query failed
        } else {
            if (results.length == 1) {
                res.json(results[0])
            } else if
                (results.length > 1) {
                console.log("Found more than one result for id", +id);
                res.sendStatus(500); // we send a 500 because this is a server bug, not the clients fault
            } else {
                // if the results is 0, so we send a 404 (not found)
                res.sendStatus(404);
            }
        }
    })

};


// function to create a new dj
let createDj = function (req, res) {
    console.log("createUser");

    let input = req.body;
    let email = input.email;

    if (!email) {
        res.status(500).send("Email is required");
        return;
    }

    // we are using parameterized sql again to avoid sql injection
    // we should ALWAYS use parameterized spl when accepting input from the client
    // and using in the spl statement, because we DO NOT TRUST THE CLIENT!!!!
    let sql = "insert into users (email) values (?)";
    let params = [email];

    db.query(sql, params, function (err, results) {
        if (err) {
            console.log("Couldn not execute sql insert", err)
            res.sendStatus(500);
        } else {
            res.sendStatus(204); // we do not have anything to return, but we want to let the client know that evertying went ok
        }
    })

}


// function to update a user given its id
let updateUser = function (req, res) {
    console.log("updateUser");

    // get the id from the path parameter
    let id = req.params.id;
    let body = req.body;
    let email = body.email;

    if (!email) {
        res.status(400).send("Email is Required");
        return;
    }

    let sql = "update users set email where id = ?";
    let params = [email, id]

    db.query(sql, params, function(err, results){
        if(err){
            console.log("could not execute update sql", err);
            res.sendStatus(500); // this is not the clients fault
        } else {
            res.sendStatus(204); // nodata to send back, but we want to let the client know everything went ok
        }
    });
}


// function to delete a user given its id
let deleteUser = function (req, res) {
    console.log("deleteUser");
    
    let id = req.params.id;

    let sql = "delete from users where id = ?" ;
    let params = [id];

    db.query(sql, params, function(err, results){
        if(err){
            console.log("failed to delete user with id:"+id, err);
            res.sendStatus(500)
        } else {
            res.sendStatus(204) // nothing to send back, but the ok status
        }
    })
}


module.exports = {
    djDetails, djSummary, createDj, updateDj, deleteDj
}