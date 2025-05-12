import { client } from "../index.js";

export async function newMentor(data) {
  try {
    return await client
      .db("mentorstask")
      .collection("mentors")
      .updateOne(
        { mentor_name: data.new_mentor },
        { $push: { students_assigned: data.student_name } }
      );
  } catch (error) {
    console.error("Error assigning student to new mentor:", error);
    throw new Error("Failed to assign student to new mentor");
  }
}

export async function studentName(data) {
  try {
    await client
      .db("mentorstask")
      .collection("students")
      .updateOne(
        { student_name: data.student_name },
        { $set: { mentor_name: data.new_mentor } }
      );
  } catch (error) {
    console.error("Error updating student’s mentor name:", error);
    throw new Error("Failed to update student record");
  }
}

export async function previousMentor(data) {
  try {
    await client
      .db("mentorstask")
      .collection("mentors")
      .updateOne(
        { mentor_name: data.previous_mentor },
        { $pull: { students_assigned: data.student_name } }
      );
  } catch (error) {
    console.error("Error removing student from previous mentor:", error);
    throw new Error("Failed to update previous mentor record");
  }
}
