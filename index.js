const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("simple Node Server is Running");
});

const users = [
  { id: 1, name: "Sabana", email: "Sabana@gmail.com" },
  { id: 2, name: "Sabana2", email: "Sabana2@gmail.com" },
  { id: 3, name: "Sabana3", email: "Sabana3@gmail.com" },
  { id: 4, name: "Sabana4", email: "Sabana4@gmail.com" },
];

// Mongo DB Code Start

const uri =
  "mongodb+srv://dbUser1:123456sanjit@cluster0.zevqp.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  const collection = client.db("simpleNode").collection("users");
  // perform actions on the collection object
  console.log("database connected");
  client.close();
});

// Mongo DB Code End

app.get("/users", (req, res) => {
  if (req.query.name) {
    const search = req.query.name;
    const filtered = users.filter(
      (usr) => usr.name.toLowerCase().indexOf(search) >= 0
    );
    res.send(filtered);
  } else {
    res.send(users);
  }
});

app.post("/users", (req, res) => {
  console.log("Post API Called");
  const user = req.body;
  user.id = users.length + 1;
  users.push(user);

  console.log(user);
  res.send(user);
});

app.listen(port, () => {
  console.log(`Simple node Server running on port $${port}`);
});
