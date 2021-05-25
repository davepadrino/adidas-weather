const mongoose = require("mongoose");

const connect = () =>
  mongoose.connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
    (err) => {
      if (err) {
        throw err;
      }
      console.log("DB Online");
    }
  );

const closeConn = () => mongoose.disconnect();

module.exports = { connect, closeConn };
