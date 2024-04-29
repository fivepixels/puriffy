const interaction = localStorage.getItem("interaction");

if (!interaction) {
  // get the source code from /fp and put it on the localstorage
  // eval(fetchedInteraction);
} else {
  // biome-ignore lint:security/noGlobalEval
  eval(interaction);
}
