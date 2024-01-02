export function signedIn(payload) {
  return { type: "users/signedIn", payload };
}

export function fetchedSession(payload) {
  return { type: "users/fetchedSession", payload };
}

export function signedOut() {
  return { type: "users/signedOut" };
}
