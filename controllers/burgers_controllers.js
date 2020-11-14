// const { Router } = require("express");
var express = require("express");
var router = express.Router();

var path = require("path");
var burger = require("../models/burger.js");
var app = express();
app.use(express.static(path.join(__dirname, "public")));

// Setting up all the routes and the logic

// router.get("/", function(req, res) {
//     res.redirect("/burgers");
//   });

router.get("/",  function (req, res) {
    burger.selectAll(function (data) {
        var hbsObject = {
            burger_data: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/api/burgers", function (req, res) {
    burger.insertOne(
        ["burger_name", "devoured"],
    [req.body.burger, false],
    function (result) {
        console.log(result);
        res.json({ id: result.insertId });
        // res.redirect("/");
    });
});

router.put("/api/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id;
    console.log(condition);

    burger.updateOne(
        // If rows are not changed, give 404 error
        {
            devoured: req.body.devoured,
        },
        condition,
        function(result){
        if(!result.changedRows === 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
        console.log(res);
        res.sendStatus(200);
    }
    );
});

//Export 
module.exports = router;