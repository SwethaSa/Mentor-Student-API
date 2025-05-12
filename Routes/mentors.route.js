import express from "express";
import {
  createMentors,
  getMentors,
  getMentorByName,
} from "../services/mentors.service.js";

const router = express.Router();

// Create mentor
router.post("/", async (request, response, next) => {
  try {
    const data = request.body;

    if (!data || typeof data !== "object" || !data.mentor_name) {
      return response
        .status(400)
        .json({ message: 'Invalid mentor data. "mentor_name" is required.' });
    }

    const result = await createMentors(data);

    if (result.acknowledged) {
      response.status(201).json({ message: "Mentor created successfully 🤩" });
    } else {
      response.status(500).json({ message: "Failed to create mentor 👀" });
    }
  } catch (err) {
    next(err);
  }
});

router.get("/", async (request, response, next) => {
  try {
    const result = await getMentors();
    response.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

router.get("/:mentor_name", async (request, response, next) => {
  try {
    const { mentor_name } = request.params;

    if (!mentor_name) {
      return response
        .status(400)
        .json({ message: "Mentor name is required in params." });
    }

    const result = await getMentorByName(mentor_name);

    if (result.length === 0) {
      return response
        .status(404)
        .json({ message: `Mentor named '${mentor_name}' not found.` });
    }

    response.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

export default router;
