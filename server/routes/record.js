const express = require ("express");
const ObjectId = require ("mongodb").ObjectId;

const app = express();

// This will help us connect to the database.
const dbo = require("../db/conn");

// This section will help you get a list of all the records.
app.get("/record", function (_req, res) {
    let db_connect = dbo.getDb("employees");
    db_connect
        .collection("records")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

app.get("/record/:id", function (req, res) {
    let db_connect = dbo.getDb("employees");
    var myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("records").findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});

app.post("/record/add", function (req, res) {
    let db_connect = dbo.getDb("employees");

    let newRecord = {
        person_name: req.body.person_name,
        person_position: req.body.person_position,
        person_level: req.body.person_level,
    };

    db_connect.collection("records").insertOne(newRecord, function (err, _result) {
        if (err) throw err;
        res.sendStatus(200);
    });
});

app.post("/update/:id", function (req, res) {
    let db_connect = dbo.getDb("employees");
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
        $set: {
            person_name: req.body.person_name,
            person_position: req.body.person_position,
            person_level: req.body.person_level,
        },
    };


    db_connect
        .collection("records")
        .updateOne(myquery, newvalues, function (err, _result) {
            if (err) throw err;
            res.sendStatus(200);
        });
});

app.delete("/delete/:id", function (req, res) {
    let db_connect = dbo.getDb("employees");
    var myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("records").deleteOne(myquery, function (err, _result) {
        if (err) throw err;
        res.sendStatus(200);
    });
});

module.exports = app;