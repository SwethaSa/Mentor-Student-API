import { client } from "../index.js";

export async function updateList(data) {
  try {
    const updates = data.students_assigned.map((student) =>
      client
        .db("mentorstask")
        .collection("students")
        .updateOne(
          { student_name: student },
          {
            $set: {
              mentor_assigned: "Yes",
              mentor_name: data.mentor_name,
            },
          }
        )
    );
    await Promise.all(updates); // Ensures all updates complete
  } catch (error) {
    console.error("Error updating student mentor assignment:", error);
    throw new Error("Failed to update one or more student records");
  }
}

export async function updateMentor(data) {
  try {
    return await client
      .db("mentorstask")
      .collection("mentors")
      .updateOne(
        { mentor_name: data.mentor_name },
        { $set: { students_assigned: data.students_assigned } }
      );
  } catch (error) {
    console.error("Error updating mentor with students:", error);
    throw new Error("Failed to update mentor record");
  }
}
