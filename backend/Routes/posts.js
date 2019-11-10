const express = require("express");
const router = express.Router();
const Table = require("../Models/tables");
const Costumer = require("../Models/costumers");

router.post("/addtables", (req, res) => {
  for (let i = 1; i <= req.body.tableNumber; i++) {
    const database = new Table({
      id: i,
      chairs: req.body.chairsTable,
      onUse: false
    });
    database
      .save()
      .then(data => {
        res.json(data);
        console.log("data recived");
      })
      .catch(err => {
        res.json({ message: err });
      });
  }
});

router.post("/addwaitinglist", (req, res) => {
  const user = new Costumer({
    quantity: req.body.quantity
  });
  user
    .save()
    .then(data => {
      res.json(data);
      console.log("data recived");
    })
    .catch(err => {
      res.json({ message: err }).send();
    });
});

router.put("/update", (req, res) => {
  req.body.forEach(item => {
    Table.findOne({ id: item.id }, (err, objectFound) => {
      if (err) {
        console.log("error");
        res.status(500).send();
      } else {
        objectFound.onUse = item.onUse;
        objectFound.save();
      }
    });
  });
});

router.delete("/deletewaitinglist", (req, res) => {
  Costumer.collection.drop();
  res.json("Success").send();
});

router.delete("/delete", (req, res) => {
  Table.collection.drop();
  res.json("Success").send();
});

router.get("/get", (req, res) => {
  Table.find({})
    .then(tables => res.json(tables))
    .catch(err => res.status(400).json(err));
});

router.get("/getwaitinglist", (req, res) => {
  Costumer.find({})
    .then(users => res.json(users))
    .catch(err => res.status(400).json(err));
});

module.exports = router;
