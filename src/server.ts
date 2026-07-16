import "dotenv/config"
import app from "./app";
import { connectDatabase } from "./config/db.config";


const PORT=process.env.PORT;

//! database connection
const DB_URI=process.env.URI!!;
connectDatabase(DB_URI);

//!
app.listen(PORT,()=>{
    console.log(`server is running at http://localhost:${PORT}`);
});