import supabase from "../supabase";

export async function getStudentById(studentId) {
  const { data, error } = await supabase
    .from("students")
    .select()
    .single()
    .eq("studentId", studentId);

  if (error)
    throw new Error(
      "Unable to retrieve student information. Student Id may not exist."
    );

  return { data };
}
