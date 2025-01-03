const express = require("express");

const app = express();

app.get("/notes", (req, res) => {
  res.send("data");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server has started on port ${port}`);
});
