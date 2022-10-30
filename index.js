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

async function run() {
  try {
    const userCollection = client.db("simpleNode").collection("users");
    // const user = { name: "Baby Sarkar", email: "baby@gmail.com" };
    // const result = await userCollection.insertOne(user);
    // console.log(result);

    app.get("/users", async (req, res) => {
      const cursor = userCollection.find({});
      const users = await cursor.toArray();
      res.send(users);
    });

    app.post("/users", async (req, res) => {
      console.log("Post API Called");
      const user = req.body;
      const result = await userCollection.insertOne(user);
      console.log(result);
      user._id = result.insertedId;

      res.send(user);
    });
  } finally {
    // await client.close();
  }
}

run().catch(console.dir);

// Mongo DB Code End

// app.get("/users", (req, res) => {
//   if (req.query.name) {
//     const search = req.query.name;
//     const filtered = users.filter(
//       (usr) => usr.name.toLowerCase().indexOf(search) >= 0
//     );
//     res.send(filtered);
//   } else {
//     res.send(users);
//   }
// });

// app.post("/users", (req, res) => {
//   console.log("Post API Called");
//   const user = req.body;
//   user.id = users.length + 1;
//   users.push(user);

//   console.log(user);
//   res.send(user);
// });

app.listen(port, () => {
  console.log(`Simple node Server running on port ${port}`);
});
