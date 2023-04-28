const express = require("express");

const { PORT } = require("./config/env")

const app = express();

const authorRoutes = require('./routes/author.routes')
const authenticateRoutes = require('./routes/authenticate.routes')
const newsRoutes = require("./routes/news.routes")


app.use(express.json())
app.use(authorRoutes)
app.use(authenticateRoutes)
app.use(newsRoutes)

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
