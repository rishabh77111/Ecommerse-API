import app from "./app";

const port=8004;
app.listen(port,()=>{
    console.log(`server is running at http://localhost:${port}`);
});