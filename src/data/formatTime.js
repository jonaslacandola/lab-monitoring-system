export function formatTime(timeString) {
  if (!timeString) return "--:-- --";

  const [hours, minutes] = timeString.split(":");

  const formattedTime = new Date(0, 0, 0, hours, minutes).toLocaleTimeString(
    [],
    { hour: "2-digit", minute: "2-digit" }
  );

  return formattedTime;
}
