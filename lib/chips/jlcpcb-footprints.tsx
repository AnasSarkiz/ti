import "tscircuit";
import { Fragment } from "react";

type RectPad = readonly [
  pin: number,
  pcbX: number,
  pcbY: number,
  width: number,
  height: number,
  shape: "rect" | "pill",
  radius?: number,
];

type CirclePad = readonly [
  pin: number,
  pcbX: number,
  pcbY: number,
  radius: number,
];

const createRectPadFootprint = (pads: readonly RectPad[]) => (
  <footprint>
    {pads.map(([pin, pcbX, pcbY, width, height, shape, radius]) =>
      shape === "pill" ? (
        <Fragment key={`pin${pin}`}>
          <smtpad
            portHints={[`pin${pin}`]}
            pcbX={pcbX}
            pcbY={pcbY}
            width={width}
            height={height}
            shape="pill"
            radius={radius ?? Math.min(width, height) / 2}
          />
        </Fragment>
      ) : (
        <Fragment key={`pin${pin}`}>
          <smtpad
            portHints={[`pin${pin}`]}
            pcbX={pcbX}
            pcbY={pcbY}
            width={width}
            height={height}
            shape="rect"
          />
        </Fragment>
      ),
    )}
  </footprint>
);

const createCirclePadFootprint = (pads: readonly CirclePad[]) => (
  <footprint>
    {pads.map(([pin, pcbX, pcbY, radius]) => (
      <Fragment key={`pin${pin}`}>
        <smtpad
          portHints={[`pin${pin}`]}
          pcbX={pcbX}
          pcbY={pcbY}
          radius={radius}
          shape="circle"
        />
      </Fragment>
    ))}
  </footprint>
);

/** Exact EasyEDA copper imported from JLCPCB C2071344. */
export const TPS62086RLTR_FOOTPRINT = createRectPadFootprint([
  [1, -0.90001725, 0.749681, 0.599948, 0.2500122, "rect"],
  [2, -0.89925525, 0.248539, 0.599948, 0.2500122, "pill", 0.1250061],
  [3, -0.89925525, -0.249301, 0.599948, 0.2500122, "pill", 0.1250061],
  [4, -0.89925525, -0.749681, 0.599948, 0.2500122, "pill", 0.1250061],
  [5, 0.44999275, -0.600583, 1.499997, 0.299974, "rect"],
  [6, 0.44999275, -0.000635, 1.499997, 0.299974, "rect"],
  [7, 0.44999275, 0.5997194, 1.499997, 0.299974, "rect"],
]);

/** Exact EasyEDA copper imported from JLCPCB C2649427. */
export const TPS25910RSA_FOOTPRINT = createRectPadFootprint([
  [1, -2.102358, 0.975106, 0.999998, 0.350012, "pill", 0.175006],
  [2, -2.102358, 0.32512, 0.999998, 0.350012, "pill", 0.175006],
  [3, -2.102358, -0.324866, 0.999998, 0.350012, "pill", 0.175006],
  [4, -2.102358, -0.974852, 0.999998, 0.350012, "pill", 0.175006],
  [5, -0.975106, -2.102612, 0.350012, 0.999998, "pill", 0.175006],
  [6, -0.32512, -2.102612, 0.350012, 0.999998, "pill", 0.175006],
  [7, 0.324866, -2.102612, 0.350012, 0.999998, "pill", 0.175006],
  [8, 0.974852, -2.102612, 0.350012, 0.999998, "pill", 0.175006],
  [9, 2.102358, -0.974852, 0.999998, 0.350012, "pill", 0.175006],
  [10, 2.102358, -0.324866, 0.999998, 0.350012, "pill", 0.175006],
  [11, 2.102358, 0.32512, 0.999998, 0.350012, "pill", 0.175006],
  [12, 2.102358, 0.975106, 0.999998, 0.350012, "pill", 0.175006],
  [13, 0.974852, 2.102612, 0.350012, 0.999998, "pill", 0.175006],
  [14, 0.324866, 2.102612, 0.350012, 0.999998, "pill", 0.175006],
  [15, -0.32512, 2.102612, 0.350012, 0.999998, "pill", 0.175006],
  [16, -0.975106, 2.102612, 0.350012, 0.999998, "pill", 0.175006],
  [17, 0, 0, 2.7999944, 2.7999944, "rect"],
]);

/** Exact EasyEDA copper imported from JLCPCB C352934. */
export const SN65LVDS31D_FOOTPRINT = createRectPadFootprint([
  [1, -4.445, -2.73558, 0.6020054, 1.9709892, "pill", 0.3010027],
  [2, -3.175, -2.73558, 0.6020054, 1.9709892, "pill", 0.3010027],
  [3, -1.905, -2.73558, 0.6020054, 1.9709892, "pill", 0.3010027],
  [4, -0.635, -2.73558, 0.6020054, 1.9709892, "pill", 0.3010027],
  [5, 0.635, -2.73558, 0.6020054, 1.9709892, "pill", 0.3010027],
  [6, 1.905, -2.73558, 0.6020054, 1.9709892, "pill", 0.3010027],
  [7, 3.175, -2.73558, 0.6020054, 1.9709892, "pill", 0.3010027],
  [8, 4.445, -2.73558, 0.6020054, 1.9709892, "pill", 0.3010027],
  [9, 4.445, 2.73558, 0.6020054, 1.9709892, "pill", 0.3010027],
  [10, 3.175, 2.73558, 0.6020054, 1.9709892, "pill", 0.3010027],
  [11, 1.905, 2.73558, 0.6020054, 1.9709892, "pill", 0.3010027],
  [12, 0.635, 2.73558, 0.6020054, 1.9709892, "pill", 0.3010027],
  [13, -0.635, 2.73558, 0.6020054, 1.9709892, "pill", 0.3010027],
  [14, -1.905, 2.73558, 0.6020054, 1.9709892, "pill", 0.3010027],
  [15, -3.175, 2.73558, 0.6020054, 1.9709892, "pill", 0.3010027],
  [16, -4.445, 2.73558, 0.6020054, 1.9709892, "pill", 0.3010027],
]);

/** SOT-723 copper imported from JLCPCB C2858690 for TI part C3040101. */
export const TPD2E009DRTR_FOOTPRINT = createRectPadFootprint([
  [1, 0.52959, -0.40005, 0.4890008, 0.294005, "rect"],
  [2, 0.52959, 0.40005, 0.4890008, 0.294005, "rect"],
  [3, -0.52959, 0, 0.4890008, 0.4340098, "rect"],
]);

/** Exact EasyEDA copper imported from JLCPCB C840096. */
export const SN74LVC1G34DBVR_FOOTPRINT = createRectPadFootprint([
  [1, 1.100074, -0.949833, 0.999998, 0.5999988, "rect"],
  [2, 1.100074, -0.000127, 0.999998, 0.5999988, "rect"],
  [3, 1.100074, 0.949833, 0.999998, 0.5999988, "rect"],
  [4, -1.100074, 0.950087, 0.999998, 0.5999988, "rect"],
  [5, -1.100074, -0.950087, 0.999998, 0.5999988, "rect"],
]);

/** Exact EasyEDA copper imported from JLCPCB C2650941. */
export const LFB212G45SG8C341_FOOTPRINT = createRectPadFootprint([
  [1, 0, 0.5750306, 1.5999968, 0.350012, "rect"],
  [2, 0.899922, -0.000127, 0.350012, 0.2999994, "rect"],
  [3, 0, -0.5750306, 1.5999968, 0.350012, "rect"],
  [4, -0.899922, -0.000127, 0.350012, 0.2999994, "rect"],
]);

/** Exact EasyEDA copper imported from JLCPCB C165141. */
export const TMP103AYFF_FOOTPRINT = createCirclePadFootprint([
  [1, 0.1998853, -0.199898, 0.0900049],
  [2, -0.1998853, -0.199898, 0.0900049],
  [3, 0.1998853, 0.199898, 0.0900049],
  [4, -0.1998853, 0.199898, 0.0900049],
]);

/** Exact EasyEDA copper imported from JLCPCB C5123155. */
export const W3006_FOOTPRINT = createRectPadFootprint([
  [1, -4.249928, 0, 1.999996, 3.1999936, "rect"],
  [2, 4.249928, 0, 1.999996, 3.1999936, "rect"],
]);

/** Exact EasyEDA copper imported from JLCPCB C18221164. */
export const XFL4015_471MEC_FOOTPRINT = createRectPadFootprint([
  [1, 1.188974, 0, 1.1999976, 3.7999924, "rect"],
  [2, -1.188974, 0, 1.1999976, 3.7999924, "rect"],
]);

/** Exact SOD-523 copper imported from JLCPCB C82323. */
export const ESD5Z6_0T1G_FOOTPRINT = createRectPadFootprint([
  [1, -0.7112, 0.0050038, 0.6096, 0.4826, "rect"],
  [2, 0.7112, -0.0050038, 0.6096, 0.4826, "rect"],
]);
