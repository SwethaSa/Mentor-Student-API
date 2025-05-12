import express from "express";
import {
  previousMentor,
  studentName,
  newMentor,
} from "../services/updateMentor.service.js";

const router = express.Router();

router.post("/", async (request, response, next) => {
  try {
    const data = request.body;

    if (
      !data ||
      !data.previous_mentor ||
      !data.new_mentor ||
      !data.student_name
    ) {
      return response.status(400).json({
        message:
          "Missing required fields: previous_mentor, new_mentor, student_name",
      });
    }

    await previousMentor(data);
    await studentName(data);
    const result = await newMentor(data);

    result.acknowledged
      ? response
          .status(200)
          .json({ message: "Updated the mentor successfully 🤩" })
      : response.status(400).json({
          message: "OOPS!! There was an error updating the mentor 👀",
        });
  } catch (error) {
    next(error);
  }
});

export default router;
