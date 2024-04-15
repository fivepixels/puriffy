import Puriffy from "puriffy";
import { describe, test, expect } from "bun:test";

describe("tests if the module is applied well.", () => {
  const ThePuriffy = new Puriffy();

  test("tests the addition", () => {
    expect(ThePuriffy.addNumber(2, 3)).toEqual(5);
  });

  test("tests the subtraction", () => {
    expect(ThePuriffy.subtractNumber(2, 3)).toEqual(-1);
  });

  test("tests the multiplication", () => {
    expect(ThePuriffy.multiplyNumber(2, 3)).toEqual(6);
  });

  test("test the devision", () => {
    expect(ThePuriffy.devideNumber(2, 3)).toEqual(2 / 3);
  });
});
