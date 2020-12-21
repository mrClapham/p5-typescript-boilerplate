import { rgbaColor } from "./index";

describe("rgbaColor", () => {
  it("Should generate a string from rgba values", () => {
    const result = rgbaColor({ r: 50, g: 60, b: 70, a: 1 });
    const expected = "rgba(50,60,70,1)";
    expect(result).toEqual(expected);
  });
  it("Should throw an Error if the RGB values are outside of acceptable values: r", () => {
    expect(() => rgbaColor({ r: 256, g: 0, b: 0, a: 1 })).toThrowError(
      "rgb values must be between 0 and 255"
    );
    expect(() => rgbaColor({ r: -1, g: 0, b: 0, a: 1 })).toThrowError(
      "rgb values must be between 0 and 255"
    );
  });
  it("Should throw an Error if the RGB values are outside of acceptable values: g", () => {
    expect(() => rgbaColor({ r: 0, g: 256, b: 0, a: 1 })).toThrowError(
      "rgb values must be between 0 and 255"
    );
    expect(() => rgbaColor({ r: 0, g: -1, b: 0, a: 1 })).toThrowError(
      "rgb values must be between 0 and 255"
    );
  });
  it("Should throw an Error if the RGB values are outside of acceptable values: b", () => {
    expect(() => rgbaColor({ r: 0, g: 0, b: 256, a: 1 })).toThrowError(
      "rgb values must be between 0 and 255"
    );
    expect(() => rgbaColor({ r: 0, g: 0, b: -1, a: 1 })).toThrowError(
      "rgb values must be between 0 and 255"
    );
  });
  it("Should throw an Error if the RGB values are outside of acceptable values: a", () => {
    expect(() => rgbaColor({ r: 255, g: 255, b: 255, a: 0 })).not.toThrow();
    expect(() => rgbaColor({ r: 0, g: 0, b: 0, a: 1 })).not.toThrow();
    expect(() => rgbaColor({ r: 255, g: 255, b: 255, a: -1 })).toThrowError(
      "Alpha value must be between 0 and 1"
    );
    expect(() => rgbaColor({ r: 0, g: 0, b: 0, a: 1.2 })).toThrowError(
      "Alpha value must be between 0 and 1"
    );
  });
});
