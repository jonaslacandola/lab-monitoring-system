import supabase from "../supabase";

export async function getLaboratories() {
  let { data, error } = await supabase.from("laboratories").select("*");

  if (error) throw new Error("Unable to retrieve laboratories information.");

  return data;
}
