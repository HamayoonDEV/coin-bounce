const express = require("express");
const dbConnect = require("./database/index");
const { PORT } = require("./config/index");
const router = require("./routes/index");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/errorhandler");
const cors = require("cors");

const corsOptions = {
  credentials: true,
  origin: ["http://localhost:3000"],
};

const app = express();

app.use(cookieParser());
app.use(cors(corsOptions));

app.use(express.json({ limit: "50mb" }));
app.use(router);
dbConnect();
app.use("/storage", express.static("storage"));
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server is runing on PORT${PORT}`);
});
