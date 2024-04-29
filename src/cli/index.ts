#!/usr/bin/env node
import { Command } from "commander";

const program = new Command("puriffier");

program
  .name("puriffier")
  .description("Puriffy's helper, puriffier.")
  .version("0.0.1");

program
  .command("begin")
  .description("begin a puriffy project.")
  .action(() => {
    console.log("BEGIN A PURIFFY PROJECT");
  });

program
  .command("dev")
  .description("test your project.")
  .action(() => {
    console.log("TEST YOUR PROJECT.");
  });

program
  .command("generate")
  .description("generate whatever you want from your project.")
  .action(() => {
    console.log("GENERATE WHATEVER YOU WANT FROM YOUR PROJECT.");
  });

program
  .command("check")
  .description("check your project.")
  .action(() => {
    console.log("CHECK YOUR PROJECT");
  });

program
  .command("build")
  .description("build your project.")
  .action(() => {
    console.log("BUILD YOUR PROJECT");
  });

program
  .command("start")
  .description("start your built project.")
  .action(() => {
    console.log("START YOUR BUILT PROJECT");
  });

program.parse();
