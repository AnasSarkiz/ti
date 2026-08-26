import type { SubcircuitProps } from "@tscircuit/props";
import { Fragment } from "react";
import { RadarClock_FW4000044Q } from "./RadarClock_FW4000044Q.circuit.tsx";
import { RadarQspiFlash_MX25V1635FZNQ } from "./RadarQspiFlash_MX25V1635FZNQ.circuit.tsx";
import {
  RADAR_SOC_INTERFACE_NETS,
  RadarSoc_AWR1843ARBGALPQ1,
} from "./RadarSoc_AWR1843ARBGALPQ1.circuit.tsx";

const COMPOSITE_INTERNAL_NETS = new Set([
  "AR_XTAL_P",
  "AR_XTAL_N",
  "AR_QSPI_CS",
  "AR_QSPI_CLK",
  "AR_QSPI_D0",
  "AR_QSPI_D1",
  "AR_QSPI_D2",
  "AR_QSPI_D3",
]);

export const RADAR_FRONT_END_INTERFACE_NETS = RADAR_SOC_INTERFACE_NETS.filter(
  (net) => !COMPOSITE_INTERNAL_NETS.has(net),
);

/**
 * Native tscircuit composite for the TIDEP-01024 radar front end and
 * processing subsystem. The child modules preserve their original TI sheet
 * coordinates; the flash sheet is placed below AOP_IO/AOP_PWR for readability.
 */
export const RadarFrontEndProcessing_TIDEP01024 = (props: SubcircuitProps) => (
  <subcircuit {...props}>
    <RadarSoc_AWR1843ARBGALPQ1 name="radar_soc" />
    <RadarClock_FW4000044Q name="radar_clock" schX={-14.605} schY={8.128} />
    <RadarQspiFlash_MX25V1635FZNQ name="qspi_flash" schX={0} schY={-22} />

    <trace
      name="COMPOSITE_XTAL_P"
      from=".radar_soc > .INTERFACE_AR_XTAL_P"
      to=".radar_clock > .INTERFACE_AR_XTAL_P"
    />
    <trace
      name="COMPOSITE_XTAL_N"
      from=".radar_soc > .INTERFACE_AR_XTAL_N"
      to=".radar_clock > .INTERFACE_AR_XTAL_N"
    />
    {[
      "AR_QSPI_CS",
      "AR_QSPI_CLK",
      "AR_QSPI_D0",
      "AR_QSPI_D1",
      "AR_QSPI_D2",
      "AR_QSPI_D3",
    ].map((net) => (
      <Fragment key={net}>
        <trace
          name={`COMPOSITE_${net}`}
          from={`.radar_soc > .INTERFACE_${net}`}
          to={`.qspi_flash > .INTERFACE_${net}`}
        />
      </Fragment>
    ))}
    <trace
      name="COMPOSITE_3V3"
      from=".radar_soc > .INTERFACE_PMIC_3V3"
      to=".qspi_flash > .INTERFACE_PMIC_3V3"
    />
    <trace
      name="COMPOSITE_GROUND"
      path={[
        ".radar_soc > .INTERFACE_GND",
        ".radar_clock > .INTERFACE_GND",
        ".qspi_flash > .INTERFACE_GND",
      ]}
    />
    {RADAR_FRONT_END_INTERFACE_NETS.map((net) => (
      <Fragment key={`port-${net}`}>
        <port name={net} />
        <trace
          name={`COMPOSITE_INTERFACE_${net}`}
          from={`.${net}`}
          to={`.radar_soc > .INTERFACE_${net}`}
        />
      </Fragment>
    ))}
  </subcircuit>
);

export default RadarFrontEndProcessing_TIDEP01024;
