import fs from "fs";

function errorHandling(error) {
  try {
    console.log(error);
    const errors = JSON.parse(fs.readFileSync("errors.json")) || [];
    errors.push(error.message);
    fs.writeFileSync("errors.json", JSON.stringify(errors, null, 4));
  } catch (error) {
    console.log(error);
  }
}

export default errorHandling;
