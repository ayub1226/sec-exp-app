const express = require('express');
const AWS = require('aws-sdk');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/api/products', (req, res) => {
  const s3 = new AWS.S3();
  const params = {
    Bucket: 'YOUR_BUCKET_NAME',
    Key: 'product-data.json',
  };

  s3.getObject(params, (err, data) => {
    if (err) {
      res.status(500).send("Error fetching data from S3");
    } else {
      res.send(JSON.parse(data.Body.toString()));
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
