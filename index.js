const express = require("express");
const app = express();
const cors = require("cors"); //for connect with frontend

const mongoose = require("mongoose");

const port = process.env.PORT || 5002;
require("dotenv").config();

// Force HTTPS (only in production)
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production' && req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(`https://${req.headers.host}${req.url}`);
  }
  next();
});

//middleware
//important for post data.
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://www.p2trip.com", "https://p2trip.com", "https://travel-app-frontend-production.up.railway.app"],
    credentials: true
  })
);

// routes
const travelRoutes = require("./src/travels/travel.route");
app.use("/api/travels", travelRoutes);

const userRoutes = require("./src/users/user.route")
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
