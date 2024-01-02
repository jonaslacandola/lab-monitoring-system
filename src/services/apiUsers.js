import supabase from "../supabase";

const auth = supabase.auth;
const sessionStorageKey = "sb-ylcrastmkkjzgmyxfwoo-auth-token";

export async function signInWithEmailAndPassword({ email, password }) {
  const { data, error } = await auth.signInWithPassword({ email, password });

  if (error) {
    console.error(error.message);
    throw new Error(
      "We're having a problem signing you in. Please provide the correct email or password."
    );
  }

  return data;
}

export function signOutUserAndSession() {
  auth.signOut();
}

export function getUserSessionToken() {
  const sessionToken = JSON.parse(localStorage.getItem(sessionStorageKey));

  return sessionToken;
}
