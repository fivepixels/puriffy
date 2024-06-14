async function common() {
  const interactionJsKey = "interactionjs";

  let interaction = localStorage.getItem(interactionJsKey);

  if (!interaction) {
    interaction = await (await fetch("/public/interaction.js")).text();

    if (!interaction) {
      console.error("There was an error while setting the interactions.");
    } else {
      localStorage.setItem(interactionJsKey, interaction);
    }
  }

  // biome-ignore lint:security/noGlobalEval
  eval(String(interaction));
}

common();
