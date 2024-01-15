import supabase from "../supabase";

export async function getComputersByLaboratoryId(laboratoryId) {
  const { data, error } = await supabase
    .from("computers")
    .select("*, laboratories: location (*)")
    .eq("location", laboratoryId);

  if (error) {
    console.log(error.message);
    throw new Error("Unable to retrieve computers information.");
  }

  return data;
}

export async function getAvailableComputers() {
  const { data, error } = await supabase
    .from("computers")
    .select("*")
    .eq("computerStatus", "available");

  if (error) {
    console.error(error.message);
    throw new Error("Unable to retrieve computers information.");
  }

  return data;
}

export async function getComputers() {
  const { data, error } = await supabase
    .from("computers")
    .select("*, laboratories: location (*)");

  if (error) {
    console.error(error.message);
    throw new Error("Unable to retrieve computers information.");
  }

  return data;
}

export async function updateComputerStatus(computerId, status) {
  if (!computerId) return;

  const { error } = await supabase
    .from("computers")
    .update({ computerStatus: status })
    .eq("computerId", computerId);

  if (error) {
    console.error(error.message);
    throw new Error(`Unable to update computer ${computerId} status.`);
  }
}

export async function updateAllUnavailable() {
  const { data } = await supabase
    .from("computers")
    .select("*")
    .eq("computerStatus", "unavailable");

  if (!data?.length) throw new Error("All computers are available.");

  const { error } = await supabase
    .from("computers")
    .update({ computerStatus: "available" })
    .eq("computerStatus", "unavailable")
    .eq("computerDamage", "");

  if (error) {
    console.error(error.message);
    throw new Error("Unable to update computers to available");
  }
}

export async function deleteComputerById(Id, laboratory) {
  const { error } = await supabase
    .from("computers")
    .delete()
    .eq("computerId", Id);

  if (error) {
    console.error(error.message);
    throw new Error("Unable to delete computer, please try again later.");
  }

  const { error: laboratoryError } = await supabase
    .from("laboratories")
    .upsert([{ ...laboratory, totalComputers: laboratory.totalComputers - 1 }]);

  if (laboratoryError) {
    console.error(error.message);
    throw new Error("Unable to update laboratory.");
  }
}

export async function createComputer(newComputer) {
  const { data } = await supabase
    .from("computers")
    .select()
    .eq("location", newComputer.location)
    .eq("computer", newComputer.computer);

  if (data.length) throw new Error("Computer already exists.");

  const { error } = await supabase.from("computers").insert([newComputer]);

  if (error) {
    console.error(error.message);
    throw new Error("Unable to add computer, please try again later.");
  }

  const { data: laboratory } = await supabase
    .from("laboratories")
    .select()
    .eq("laboratoryId", newComputer.location)
    .single();

  const { error: labError } = await supabase
    .from("laboratories")
    .upsert([{ ...laboratory, totalComputers: laboratory.totalComputers + 1 }]);

  if (labError) {
    console.error(labError.message);
    throw new Error("Unable to update laboratory.");
  }
}

export async function getComputerById(Id) {
  const { data, error } = await supabase
    .from("computers")
    .select("*")
    .eq("computerId", Id);

  if (error) {
    console.error(error.message);
    throw new Error("Unable to retrieve computer information.");
  }

  return data;
}

export async function updateComputer(computer) {
  const { error } = await supabase
    .from("computers")
    .update(computer)
    .eq("computerId", computer.computerId);

  if (error) {
    console.log(error.message);
    throw new Error("Unable to update computer, please try again later.");
  }
}
