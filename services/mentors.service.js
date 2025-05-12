import { client } from "../index.js";

// Get mentor by name
export async function getMentorByName(mentor_name) {
  try {
    return await client
      .db("mentorstask")
      .collection("mentors")
      .find({ mentor_name })
      .toArray();
  } catch (error) {
    console.error("Error fetching mentor by name:", error);
    throw new Error("Failed to fetch mentor by name");
  }
}

// Get all mentors
export async function getMentors() {
  try {
    return await client
      .db("mentorstask")
      .collection("mentors")
      .find({})
      .toArray();
  } catch (error) {
    console.error("Error fetching mentors:", error);
    throw new Error("Failed to fetch mentors");
  }
}

// Create a mentor
export async function createMentors(data) {
  try {
    return await client.db("mentorstask").collection("mentors").insertOne(data);
  } catch (error) {
    console.error("Error inserting mentor:", error);
    throw new Error("Failed to create mentor");
  }
}
