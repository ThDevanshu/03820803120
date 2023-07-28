const express = require("express");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const app = express();
const port = 8008;
app.get("/numbers", async (req, res) => {
  var urlList = req.query.url;
  const mySet = new Set();
  for (var i = 0; i < urlList.length; i++) {
    const options = { method: "GET" };
    var data = await fetch(urlList[i], options)
      .then((res) => res.json())
      .catch((err) => console.error("error:" + err));
    if (data) {
      data.numbers.forEach((item) => mySet.add(item));
    }
  }
  const myArray = Array.from(mySet);
  myArray.sort(function (a, b) {
    return a - b;
  });
  const ans = { numbers: myArray };
  res.send(ans);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});