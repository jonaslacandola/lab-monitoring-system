import supabase from "../supabase";

export async function createStudentAttendance(newAttendance) {
  const { error } = await supabase.from("attendances").insert([newAttendance]);

  if (error) {
    console.error(error.message);
    throw new Error("Unable to record attendance. Please try again later.");
  }
}

export async function getAttendances() {
  const { data, error } = await supabase.from("attendances").select("*");

  if (error) {
    console.error(error.message);
    throw new Error("Unable to retrieve attendance information.");
  }

  return data;
}

export async function getAttendanceWithStudentLaboratoryComputer() {
  const { data, error } = await supabase
    .from("attendances")
    .select(
      "*, students: studentId (*), laboratories: laboratoryId (*), computers: computerId (*)"
    );

  if (error) {
    console.error(error.message);
    throw new Error("Unable to retrieve attendance information.");
  }

  return data;
}

export async function getAttendancesByDate(currentDate) {
  const { data, error } = await supabase
    .from("attendances")
    .select(
      "*, students: studentId (*), laboratories: laboratoryId (*), computers: computerId (*)"
    )
    .eq("createdAt", currentDate);

  if (error) {
    console.error(error.message);
    throw new Error("Unable to retrieve attendance information.");
  }

  return data;
}
