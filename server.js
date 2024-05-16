import express from "express";
import fetch from "node-fetch";

const app = express();
const port = 3000;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//
app.get("/solr-proxy", (req, res) => {
  const query = req.query.q;
  const solrUrl = `http://localhost:8983/solr/nutch/query?q=${query}`;

  fetch(solrUrl)
    .then((response) => response.json())
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).json({ error: "An error occurred" });
    });
});

app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});
