const express = require("express");
const app = express();
const db = require("./db");
const port = process.env.PORT || 3000;

db();

app.listen(port, () => {
  console.log(`Server running in port ${port}`);
});
