interface ActiveMegaMenuRoot {
  close: () => void;
  key: object;
}

let activeRoot: ActiveMegaMenuRoot | null = null;

/** 複数のnavランドマークに分かれたMegaMenu Rootを相互排他にする。 */
export function activateMegaMenuRoot(key: object, close: () => void) {
  if (activeRoot?.key === key) return;

  const previousRoot = activeRoot;
  activeRoot = { close, key };
  previousRoot?.close();
}

export function deactivateMegaMenuRoot(key: object) {
  if (activeRoot?.key === key) {
    activeRoot = null;
  }
}
