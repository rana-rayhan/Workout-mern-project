require("dotenv").config();
const { default: mongoose } = require("mongoose");
const app = require("./app.js");
const port = process.env.PORT || 6000;

mongoose
  .connect(process.env.RESTURANT_DB)
  .then(() => {
    // Listen for request
    app.listen(port, () =>
      console.log(`Connected & Listening on port ${port}!`)
    );
  })
  .catch((error) => {
    console.log(error);
  });
