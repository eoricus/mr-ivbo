const { tokens, members, competitions } = require("./db");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 80;
let i = 0;


app.use(express.static("../../page/dist"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/return", async (req, res) => {
  members.updateMany({}, {"$set": {
    "score": 400
  }})
});

app.get("/", async (req, res) => {
  res.sendFile("./index.html");
});

app.get("/member", async (req, res) => {
  let member = await members.findOne({
    index: parseInt(req.query.id),
  });
  res.statusCode = 200;
  res.send(JSON.stringify(member));
});

app.get("/changeScore", async (req, res) => {
  let member = await members.updateOne(
    {
      index: parseInt(req.query.id),
    },
    { $set: {score: parseInt(req.query.score)}, $inc: {count: 1} }
  );
  res.statusCode = 200;
  res.send("ok");
});

app.get("/newCompetition", async (req, res) => {
  await competitions.insertOne(
    {
      firstId: parseInt(req.query.FirstId),
      secondId: parseInt(req.query.SecondId),
      winner: parseInt(req.query.Winner),
      token: req.query.token
    },
  );
  res.statusCode = 200;
  res.send("ok");
});

app.get("/top3", async (req, res) => {
  let top3 = await members.find().sort({score: -1}).toArray();
  res.statusCode = 200;
  res.send(JSON.stringify([
    top3[0],top3[1],top3[2]
  ]));
});


app.listen(port, () => {
  
  console.log(`Example app listening at http://localhost:${port}`);
});
