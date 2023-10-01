const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("65195ac8d8152b9a10cf2f8e")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});


app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);


mongoose
  .connect(
    "mongodb+srv://kk:W13X0R2Ld5Qn4kfw@cluster0.2isva5p.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "kirtikumar",
          email: "kirti@gmail.com",
          cart: { items: [] },
        });
        user.save();
      }
    });

    console.log("connected To DB");
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
