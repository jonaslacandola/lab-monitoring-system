import supabase from "../supabase";

export async function createStudentAttendance(newAttendance) {
  const { error } = await supabase.from("attendances").insert([newAttendance]);

  if (error) {
    console.error(error.message);
    throw new Error("Unable to record attendance. Please try again later.");
  }
}

export async function getAttendances() {
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

export async function updateAttendancesTimeOut(attendances, currentDate) {
  const { error } = await supabase
    .from("attendances")
    .upsert(attendances)
    .eq("createdAt", currentDate);

  if (error) {
    console.error(error.message);
    throw new Error("Unable to time out attendances.");
  }
}

export async function updateTimeOutSpecific(attendance) {
  const { error } = await supabase
    .from("attendances")
    .upsert([attendance])
    .eq("createdAt", attendance.currentDate);

  if (error) {
    console.error(error.message);
    throw new Error("Unable to time out attendance, please try again later.");
  }

  const { error: computerError } = await supabase
    .from("computers")
    .update({ computerStatus: "available" })
    .eq("computerId", attendance.computerId);

  if (computerError) {
    console.error(computerError.message);
    throw new Error("Unable to available computer used.");
  }
}
