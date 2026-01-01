const express = require("express");
const app = express();
const cors = require("cors"); //for connect with frontend

const admin = require("./src/utils/FirebaseAdmin");

const mongoose = require("mongoose");

require("dotenv").config();
const port = process.env.PORT || 5002;

const localUrl = process.env.LOCAL_URL;
const deployedUrl = process.env.DEPLOYED_URL;

//middleware
//important for post data.
app.use(express.json());
app.use(
  cors({
    origin: [localUrl, deployedUrl],
    credentials: true,
  })
);

// routes
const travelRoutes = require("./src/travels/travel.route");
app.use("/api/travels", travelRoutes);

const userRoutes = require("./src/users/user.route");
app.use("/api/auth", userRoutes);

async function main() {
  await mongoose.connect(process.env.DB_URL);
  app.use("/", (req, res) => {
    res.send("Travel server is running");
  });
}

main()
  .then(() => console.log("Mongodb connected successfully"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
