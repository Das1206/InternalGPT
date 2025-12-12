function Capitalize(str: string | undefined) {
  // Check if the input is a valid string
  if (typeof str !== "string") {
    return str;
  }

  // Capitalize the first letter and concatenate the rest of the string
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default Capitalize;
