import createEncryptedPspiceNgspiceEngine, {
  createCdnNgspiceSpiceEngine,
} from "./lib/spice/create-encrypted-pspice-ngspice-engine.ts";

export default {
  mainEntrypoint: "index.ts",
  platformConfig: {
    spiceEngineMap: {
      ngspice: createCdnNgspiceSpiceEngine(),
      "encrypted-pspice-ngspice": createEncryptedPspiceNgspiceEngine(),
    },
  },
};
