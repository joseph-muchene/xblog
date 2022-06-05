const mongoose = require("mongoose");

module.exports = async function (port) {
  await mongoose
    .connect("mongodb://localhost/xblog")
    .then(() => {
      console.log(`mongodb connected  on port ${port}`);
    })
    .catch((err) => {
      throw new Error(err);
    });
};
