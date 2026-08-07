import type { SpiceEngine } from "@tscircuit/props";
import { decryptEncryptedPspiceModelsInSpice } from "./encrypted-pspice-model.ts";

let ngspiceModulePromise: Promise<{
  default: () => Promise<SpiceEngine>;
}> | null = null;

const nativeImport = new Function("moduleUrl", "return import(moduleUrl)") as <
  T,
>(
  moduleUrl: string,
) => Promise<T>;

const importNgspiceSpiceEngine = async () => {
  if (!ngspiceModulePromise) {
    const processLike = (
      globalThis as {
        process?: { versions?: { node?: string } };
      }
    ).process;
    const isNodeRuntime = Boolean(processLike?.versions?.node);
    ngspiceModulePromise = nativeImport<{
      default: () => Promise<SpiceEngine>;
    }>(
      isNodeRuntime
        ? "@tscircuit/ngspice-spice-engine"
        : "https://jscdn.tscircuit.com/@tscircuit/ngspice-spice-engine/0.0.18/+esm",
    );
  }

  return ngspiceModulePromise;
};

export const createCdnNgspiceSpiceEngine = (): SpiceEngine => {
  let ngspiceEnginePromise: Promise<SpiceEngine> | null = null;
  const getNgspiceEngine = () => {
    if (!ngspiceEnginePromise) {
      ngspiceEnginePromise = importNgspiceSpiceEngine().then(
        ({ default: createNgspiceSpiceEngine }) => createNgspiceSpiceEngine(),
      );
    }

    return ngspiceEnginePromise;
  };

  return {
    async simulate(spiceString) {
      return (await getNgspiceEngine()).simulate(spiceString);
    },
  };
};

export const createEncryptedPspiceNgspiceEngine = (): SpiceEngine => {
  const ngspiceEngine = createCdnNgspiceSpiceEngine();

  return {
    async simulate(spiceString) {
      return ngspiceEngine.simulate(
        await decryptEncryptedPspiceModelsInSpice(spiceString),
      );
    },
  };
};

export default createEncryptedPspiceNgspiceEngine;
