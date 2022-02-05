export function mousePositionListener(element: HTMLCanvasElement,
  callback: (e: MouseEvent) => void): () => void {
  function onMove(e: MouseEvent): void {
    callback(e);
  }

  element.addEventListener("mousemove", onMove);

  return (): void => {
    element.removeEventListener("mousemove", onMove);
  };
}
