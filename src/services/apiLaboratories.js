import supabase, { supabaseUrl } from "../supabase";

export async function getLaboratories() {
  const { data, error } = await supabase.from("laboratories").select("*");

  if (error) throw new Error("Unable to retrieve laboratories information.");

  return data;
}

export async function createNewLaboratory(newLaboratory) {
  const imageName = `${Math.random()}-${newLaboratory.imageURL.name}`.replace(
    "/",
    ""
  );
  const imagePath = `${supabaseUrl}/storage/v1/object/public/laboratories/${imageName}`;

  const { data: laboratory } = await supabase
    .from("laboratories")
    .select()
    .eq("laboratoryName", newLaboratory.laboratoryName);

  if (laboratory.length) {
    throw new Error("Laboratory already exist!");
  }

  const { data, error } = await supabase
    .from("laboratories")
    .insert([{ ...newLaboratory, imageURL: imagePath }])
    .select();

  if (error) {
    console.error(error.message);
    throw new Error("Unable to add new laboratory, please try again later.");
  }

  const { error: storageError } = supabase.storage
    .from("laboratories")
    .upload(imageName, newLaboratory.imageURL);

  if (storageError) {
    console.error(storageError.message);
    await supabase
      .from("laboratories")
      .delete()
      .eq("laboratoryId", data?.at(0).laboratoryId);
    throw new Error("Unable to add new laboratory, uploading of image failed.");
  }

  const newComputers = [];
  for (let count = 0; count < newLaboratory.totalComputers; count++) {
    newComputers.push({
      computer: `00${count}`,
      location: data.at(0)?.laboratoryId,
      computerStatus:
        newLaboratory.laboratoryStatus === "open" ? "available" : "unavailable",
      computerDamage: "",
    });
  }

  const { error: computerError } = await supabase
    .from("computers")
    .insert(newComputers);

  if (computerError) {
    console.error(computerError.message);
    await supabase
      .from("laboratories")
      .delete()
      .eq("laboratoryId", data?.at(0).laboratoryId);
    throw new Error(
      "Unable to add new laboratory, adding of computers failed."
    );
  }
}

export async function updateLaboratoryById(laboratory) {
  const imageName = `${Math.random()}-${laboratory.imageURL?.name}`.replace(
    "/",
    ""
  );
  const imagePath = `${supabaseUrl}/storage/v1/object/public/laboratories/${imageName}`;
  const { prevImageURL, ...restOfLaboratory } = laboratory;
  const updatedLaboratory = {
    ...restOfLaboratory,
    imageURL: laboratory.imageURL ? imagePath : prevImageURL,
  };
  const relativeImagePath = prevImageURL?.replace(
    `${supabaseUrl}/storage/v1/object/public/laboratories/`,
    ""
  );

  const { error } = await supabase
    .from("laboratories")
    .update(updatedLaboratory)
    .eq("laboratoryId", laboratory.laboratoryId);

  if (error) {
    console.error(error.message);
    throw new Error("Unable to updated laboratory, please try again later.");
  }

  console.log(laboratory.laboratoryStatus);

  const { error: computerError } = await supabase
    .from("computers")
    .update({
      computerStatus:
        laboratory.laboratoryStatus === "open" ? "available" : "unavailable",
    })
    .eq("location", laboratory.laboratoryId);

  if (computerError) {
    console.error(computerError.message);
    throw new Error("Unable to update laboratory computers.");
  }

  if (!laboratory.imageURL) return;

  const { error: uploadError } = await supabase.storage
    .from("laboratories")
    .upload(imageName, laboratory.imageURL);

  if (uploadError) {
    console.error(uploadError.message);
    throw new Error("Unable to updated new image.");
  }

  const { error: deleteError } = await supabase.storage
    .from("laboratories")
    .remove([relativeImagePath]);

  if (deleteError) {
    console.error(deleteError.message);
    throw new Error("Unable to delete previous image.");
  }
}

export async function deleteLaboratoryById(labId, imageURL) {
  const relativeImagePath = imageURL?.replace(
    `${supabaseUrl}/storage/v1/object/public/laboratories/`,
    ""
  );

  const { error } = await supabase
    .from("laboratories")
    .delete()
    .eq("laboratoryId", labId);

  if (error) {
    console.error(error.message);
    throw new Error("Unable to delete laboratory, please try again later.");
  }

  const { error: imageError } = await supabase.storage
    .from("laboratories")
    .remove([relativeImagePath]);

  if (imageError) {
    console.error(imageError.message);
    throw new Error("Unable to delete image.");
  }
}
