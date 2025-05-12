import express from "express";
import { updateMentor, updateList } from "../services/assignmentor.service.js";

const router = express.Router();

router.post("/", async (request, response, next) => {
  try {
    const data = request.body;

    if (!data || !data.mentor_name || !Array.isArray(data.students_assigned)) {
      return response.status(400).json({
        message:
          "Missing required fields: mentor_name, students_assigned (array)",
      });
    }

    const result = await updateMentor(data);
    await updateList(data);

    result.acknowledged
      ? response
          .status(200)
          .send({ message: "Student assigned successfully 🤩" })
      : response
          .status(400)
          .send({ message: "OOPS!! Error in assigning student 👀" });
  } catch (error) {
    next(error);
  }
});

export default router;
