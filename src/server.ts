import app from "./app";
import { connectDatabase } from "./config/db.config";


const port=8004;

//database connection
const DB_URI="mongodb://localhost:27017/ecommerseAPI";
connectDatabase(DB_URI);
app.listen(port,()=>{
    console.log(`server is running at http://localhost:${port}`);
});