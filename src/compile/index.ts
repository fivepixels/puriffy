import build from "./builder";
import check from "./checker";

async function compile() {
  const errorMessages = await check();

  for (const currentErrorMessage of errorMessages) {
    console.error(currentErrorMessage);
  }

  if (errorMessages.length >= 1) {
    process.exit();
  }

  await build();
}

export default compile;
