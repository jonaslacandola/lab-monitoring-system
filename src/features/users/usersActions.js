export function signedIn(payload) {
  return { type: "users/signedIn", payload };
}

export function signedOut() {
  return { type: "users/signedOut" };
}
