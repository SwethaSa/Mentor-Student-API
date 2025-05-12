import { client } from "../index.js";

export async function getStudents() {
  try {
    return await client
      .db("mentorstask")
      .collection("students")
      .find({ mentor_assigned: "No" })
      .toArray();
  } catch (error) {
    console.error("Error fetching students:", error);
    throw new Error("Failed to fetch students");
  }
}

export async function createStudents(data) {
  try {
    return await client
      .db("mentorstask")
      .collection("students")
      .insertMany(data);
  } catch (error) {
    console.error("Error inserting students:", error);
    throw new Error("Failed to create students");
  }
}
