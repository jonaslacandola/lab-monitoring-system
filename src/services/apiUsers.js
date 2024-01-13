import supabase, { supabaseUrl } from "../supabase";

export async function signInWithEmailAndPassword({ email, password }) {
  const { data: admin, error: signInError } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (signInError) {
    console.error(signInError.message);
    throw new Error(
      "We're having a problem signing you in. Please provide the correct email or password."
    );
  }

  const { data, error } = await supabase
    .from("admins")
    .select()
    .eq("adminId", admin.user.id);

  if (error) {
    console.error(error.message);
    throw new Error(
      "We're having a problem signing you in. Please provide the correct email or password."
    );
  }

  return data;
}

export async function getUserSession() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) throw new Error("Session expired, please sign in.");

  const { data: user } = await supabase.auth.getUser();

  if (!user.user) throw new Error("Session expired, please sign in.");

  const { data, error } = await supabase
    .from("admins")
    .select()
    .eq("adminId", user.user.id);

  if (error) {
    console.error(error.message);
    throw new Error("Unable to sign in, signing out.");
  }

  return data;
}

export function signOutUserAndSession() {
  supabase.auth.signOut();
}

export async function createAdminWithEmailAndPassword(admin) {
  const { adminEmail: email, adminPassword: password } = admin;
  const { firstName, lastName, adminEmail, pfpURL } = admin;

  const imageName = `${Math.random()}-${pfpURL.name}`.replace("/", "");
  const imagePath = `${supabaseUrl}/storage/v1/object/public/admins/${imageName}`;

  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    console.error(error.message);
    throw new Error("Unable to create new account, account already exists.");
  }

  const { error: dbError } = await supabase.from("admins").insert([
    {
      adminId: data.user.id,
      firstName,
      lastName,
      adminEmail,
      pfpURL: imagePath,
    },
  ]);

  if (dbError) {
    console.error(dbError.message);
    //Add delete account here
    throw new Error("Unable to create new account, please try again later.");
  }

  const { error: storageError } = await supabase.storage
    .from("admins")
    .upload(imageName, pfpURL);

  if (storageError) {
    console.error(storageError.message);
    throw new Error("Unable to upload account image.");
  }
}
