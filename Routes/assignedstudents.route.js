import express from "express";
import { assignedStudents } from "../services/assignedstudents.service.js";

const router = express.Router();

router.get("/", async (request, response, next) => {
  try {
    const result = await assignedStudents();
    response.status(200).send(result);
  } catch (error) {
    console.error("Error fetching assigned students:", error);
    next(error);
  }
});

export default router;
