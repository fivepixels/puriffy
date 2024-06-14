#!/usr/bin/env bun

import compile from "@src/compile";
import { spawn } from "bun";

main(Bun.argv[2], Bun.argv.slice(3));

interface PuriffierCommands {
  command: string;
  description: string;
  options?: CommandOptions[];
  action: (args: string[]) => void | Promise<void>;
}

interface CommandOptions {
  optionName: string;
}

async function main(command: string, args: string[]): Promise<void> {
  const puriffierCommands: PuriffierCommands[] = [
    {
      command: "begin",
      description: "Begin a puriffy project.",
      async action() {
        spawn([
          "git",
          "clone",
          "https://github.com/puriffy/quickstart.git",
          ".",
        ]);
        return;
      },
    },
    {
      command: "generate",
      description: "Generate something on your puriffy project.",
      action() {
        console.log("!GENERATE!");
        return;
      },
    },
    {
      command: "build",
      description: "Build your puriffy project.",
      action() {
        compile();
      },
    },
    {
      command: "start",
      description: "Start your puriffy project.",
      async action() {
        spawn(["bun", "run", `${process.cwd()}/src/server/index.js`]);
        return;
      },
    },
  ];

  const indexOfFoundCommand = puriffierCommands.findIndex(
    (value) => value.command === command,
  );

  if (indexOfFoundCommand <= -1) {
    console.log("COMMAND NOT FOUND.");
    return;
  }

  const foundCommand = puriffierCommands[indexOfFoundCommand];

  const start = performance.now();
  await foundCommand.action(args);
  const end = performance.now();

  console.log(`COMMAND DONE IN ${end - start}ms.`);
}
