#!/usr/bin/env bun

import { check, build } from "@src/core";

main(Bun.argv[2], Bun.argv.slice(3));

interface PuriffierCommands {
  command: string;
  description: string;
  options?: CommandOptions[];
  actions: (args: string[]) => void | Promise<void>;
}

interface CommandOptions {
  optionName: string;
}

async function main(command: string, args: string[]): Promise<void> {
  const puriffierCommands: PuriffierCommands[] = [
    {
      command: "begin",
      description: "Begin a puriffy project.",
      actions() {
        console.log("!BEGIN!");
      },
    },
    {
      command: "dev",
      description: "Test your puriffy project.",
      actions() {
        console.log("!DEV!");
      },
    },
    {
      command: "generate",
      description: "Generate something on your puriffy project.",
      actions() {
        console.log("!GENERATE!");
      },
    },
    {
      command: "build",
      description: "Build your puriffy project.",
      async actions() {
        await build();
      },
    },
    {
      command: "start",
      description: "Start your puriffy project.",
      actions() {
        console.log("!START!");
      },
    },
  ];

  const indexOfFoundCommand = puriffierCommands.findIndex(
    (value) => value.command === command,
  );

  if (command === "help" || indexOfFoundCommand <= -1) {
    return;
  }

  const foundCommand = puriffierCommands[indexOfFoundCommand];
  await foundCommand.actions(args);
}
