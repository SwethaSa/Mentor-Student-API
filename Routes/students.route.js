import express from "express";
import { createStudents, getStudents } from "../services/students.service.js";

const router = express.Router();

router.post("/", async (request, response, next) => {
  try {
    const data = request.body;

    if (!Array.isArray(data) || data.length === 0) {
      return response
        .status(400)
        .json({ message: "Input must be a non-empty array of students" });
    }

    const isValid = data.every(
      (student) => student.name && typeof student.name === "string"
    );

    if (!isValid) {
      return response
        .status(400)
        .json({ message: "Each student must have a valid name" });
    }

    const result = await createStudents(data);

    if (result.acknowledged) {
      response
        .status(201)
        .json({ message: "Students created successfully 🤩" });
    } else {
      response
        .status(500)
        .json({ message: "Something went wrong while creating students" });
    }
  } catch (err) {
    next(err);
  }
});

router.get("/", async (request, response, next) => {
  try {
    const result = await getStudents();
    response.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

export default router;
