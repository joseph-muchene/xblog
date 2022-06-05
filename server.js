require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors")
const morgan = require("morgan")



// =========== ROUTES ================
const articleRoute = require("./routes/ArticleRoute.js")
const userRoute = require("./routes/userRoute.js")

// ============== MIDDLEWARES ================

app.use(express.json())
app.use(cors())
app.use(morgan("dev"))


// ========= ROUTE middleware ===========

app.use("/api/user",userRoute)
app.use("/api/article",articleRoute)

// =============MONGODB connection ===============
const Connectdb = require("./config/Connectdb");
Connectdb(process.env.PORT );
// =========== PORT =============
const PORT = process.env.PORT;

// ======== listen on PORT =========
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
