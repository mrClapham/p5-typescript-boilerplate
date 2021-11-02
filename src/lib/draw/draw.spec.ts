/**
 * @jest-environment jsdom
 */

import { draw } from ".";

const mockCallback = jest.fn(() => true);

describe("draw", () => {
  describe("draw and pause", () => {
    it("Should call the passed callback function ", () => {
      const { pause, play } = draw(mockCallback, {});

      expect(typeof pause === "function").toBe(true);
      expect(typeof play === "function").toBe(true);
    });
  });
});
