const express = require("express");

const app = express();

const autorRoutes = require('./routes/autor.routes')
const authenticateRoutes = require('./routes/authenticate.routes')

const PORT = 3333;

app.use(express.json())
app.use(autorRoutes)
app.use(authenticateRoutes)

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
