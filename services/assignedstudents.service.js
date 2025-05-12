import { client } from "../index.js";

export async function assignedStudents() {
  try {
    return await client
      .db("mentorstask")
      .collection("students")
      .find({ mentor_assigned: "Yes" })
      .toArray();
  } catch (error) {
    console.error("Database error in fetching assigned students:", error);
    throw new Error("Failed to fetch assigned students from the database");
  }
}
