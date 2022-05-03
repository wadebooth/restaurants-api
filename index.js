import express from "express";
import cors from "cors";

const app = express; //creates
app.use(cors()); //allows app to use cors
app.use(express.json()); // allows app to use JSON

//Routes go here... -- defining which requests are allowed --

app.listen(3000, () => {
  console.log("Listening on http://localhost:3000...");
});
