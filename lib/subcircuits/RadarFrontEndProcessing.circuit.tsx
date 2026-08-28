import type { SubcircuitProps } from "@tscircuit/props";
import { Fragment } from "react";
import { RadarQspiFlash_MX25V1635FZNQ } from "./RadarQspiFlash_MX25V1635FZNQ.circuit.tsx";
import {
  RADAR_SOC_INTERFACE_ENDPOINTS,
  RADAR_SOC_INTERFACE_NETS,
  RadarSoc_AWR1843ARBGALPQ1,
} from "./RadarSoc_AWR1843ARBGALPQ1.circuit.tsx";

const RADAR_QSPI_SHEET_NAME = "qspi_flash";
// Re-center the X=500 extraction origin on the Altium sheet and retain one
// 10-unit source-grid step of clearance inside the native inner frame.
const RADAR_QSPI_SHEET_X_OFFSET = -3.6576;

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

const radarSocEndpoint = (net: string) =>
  `.radar_soc > ${RADAR_SOC_INTERFACE_ENDPOINTS[net]}`;

const COMPOSITE_CONNECTIONS = [
  {
    net: "AR_QSPI_CS",
    endpoints: [radarSocEndpoint("AR_QSPI_CS"), ".qspi_flash > .U9 > .CS"],
  },
  {
    net: "AR_QSPI_CLK",
    endpoints: [radarSocEndpoint("AR_QSPI_CLK"), ".qspi_flash > .R47 > .pin1"],
  },
  {
    net: "AR_QSPI_D0",
    endpoints: [radarSocEndpoint("AR_QSPI_D0"), ".qspi_flash > .R6 > .pin1"],
  },
  {
    net: "AR_QSPI_D1",
    endpoints: [radarSocEndpoint("AR_QSPI_D1"), ".qspi_flash > .R46 > .pin1"],
  },
  {
    net: "AR_QSPI_D2",
    endpoints: [radarSocEndpoint("AR_QSPI_D2"), ".qspi_flash > .R48 > .pin1"],
  },
  {
    net: "AR_QSPI_D3",
    endpoints: [radarSocEndpoint("AR_QSPI_D3"), ".qspi_flash > .R49 > .pin1"],
  },
  {
    net: "PMIC_3V3",
    endpoints: [radarSocEndpoint("PMIC_3V3"), ".qspi_flash > .U9 > .VCC"],
  },
  {
    net: "GND",
    endpoints: [radarSocEndpoint("GND"), ".qspi_flash > .U9 > .GND"],
  },
] as const;

/**
 * Native tscircuit composite for the TIDEP-01024 radar front end and
 * processing subsystem. The radar SoC child owns the complete AOP I/O and
 * power sheets, including the 40 MHz crystal schematic section. The QSPI
 * flash remains on its original independent TI sheet.
 */
export const RadarFrontEndProcessing = (props: SubcircuitProps) => (
  <subcircuit {...props}>
    <schematicsheet
      name={RADAR_QSPI_SHEET_NAME}
      displayName="QSPI Flash"
      sheetIndex={2}
    />
    <RadarSoc_AWR1843ARBGALPQ1 name="radar_soc" />
    <RadarQspiFlash_MX25V1635FZNQ
      name="qspi_flash"
      schSheetName={RADAR_QSPI_SHEET_NAME}
      schX={RADAR_QSPI_SHEET_X_OFFSET}
      schY={0}
    />

    {COMPOSITE_CONNECTIONS.map(({ net, endpoints }) => (
      <Fragment key={net}>
        {endpoints.map((endpoint, index) => (
          <Fragment key={`${net}-${index}`}>
            <trace
              name={`COMPOSITE_${net}_${index + 1}`}
              from={endpoint}
              to={`net.${net}`}
              schDisplayLabel={net}
            />
          </Fragment>
        ))}
      </Fragment>
    ))}

    {RADAR_FRONT_END_INTERFACE_NETS.map((net) => (
      <Fragment key={`interface-${net}`}>
        <port name={net} />
        <trace
          name={`COMPOSITE_INTERFACE_${net}`}
          from={`.${net}`}
          to={radarSocEndpoint(net)}
        />
      </Fragment>
    ))}
  </subcircuit>
);

export default RadarFrontEndProcessing;
