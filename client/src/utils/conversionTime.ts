export function convertTime(time: string, date: string) {
  const [hours, minutes] = time.split(":").map(Number)
  let d: Date

  // Detect format
  if (date.includes("-")) {
    // YYYY-MM-DD
    const [year, month, day] = date.split("-").map(Number)
    d = new Date(year, month - 1, day, hours, minutes, 0, 0)
  } else if (date.includes("/")) {
    // MM/DD/YYYY
    const [month, day, year] = date.split("/").map(Number)
    d = new Date(year, month - 1, day, hours, minutes, 0, 0)
  } else {
    throw new Error("Invalid date format: " + date)
  }

  // Validate
  if (isNaN(d.getTime())) throw new Error("Invalid date/time after parsing")

  // Return ISO string (UTC) for backend
  return d.toISOString()
}
