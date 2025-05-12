import express from "express";
import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
import mentorsRoute from "./Routes/mentors.route.js";
import studentsRoute from "./Routes/students.route.js";
import assignedstudentsRoute from "./Routes/assignedstudents.route.js";
import assignmentorRoute from "./Routes/assignmentor.route.js";
import changementorRoute from "./Routes/updateMentor.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

const MONGO_URL = process.env.MONGO_URL;
const client = new MongoClient(MONGO_URL);
await client.connect();
console.log("Your MongoDB is connected😍👍");

app.use(express.json());

app.get("/", function (request, response) {
  const API = process.env.API;
  response.send(`
      <style>
      body{
        background-color: black;

      }
        h1 {
          font-family: sans-serif;
          color: white;
          text-align: center;
          text-shadow: 0 0 5px white;
          box-shadow: 2px 2px 50px grey;
          padding: 20px;
          margin-top:6cm;
        }
      </style>
      <h1>
        MentorsList - <a https://mentor-student-api-1-38xn.onrender.com/mentors" style="color: #00BFFF; text-shadow:none">https://mentor-student-api-1-38xn.onrender.com/mentors</a><br><br>
        MentorsByName - <a https://mentor-student-api-1-38xn.onrender.com/mentors/Ragav" style="color: #00BFFF; text-shadow:none">https://mentor-student-api-1-38xn.onrender.com/mentors/Ragav</a><br><br>
        StudentsList - <a https://mentor-student-api-1-38xn.onrender.com/students" style="color: #00BFFF; text-shadow:none">https://mentor-student-api-1-38xn.onrender.com/students</a><br><br>
        AssignedStudents - <a https://mentor-student-api-1-38xn.onrender.com/assigned_students" style="color: #00BFFF; text-shadow:none">https://mentor-student-api-1-38xn.onrender.com/assigned_students</a>
      </h1>
    `);
});

app.use("/mentors", mentorsRoute);
app.use("/students", studentsRoute);
app.use("/assigned_students", assignedstudentsRoute);
app.use("/assign_mentor", assignmentorRoute);
app.use("/change_mentor", changementorRoute);

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));

app.use((err, req, res, next) => {
  console.error("🔥 Error:", err.stack || err.message);
  res.status(500).json({
    message: "Something went wrong. Please try again later.",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

export { client };
