import type { SubcircuitProps } from "@tscircuit/props";
import { Fragment } from "react";
import { MX25V1635FZNQ } from "../chips/MX25V1635FZNQ.circuit.tsx";

/**
 * TIDEP-01024 FLASH&USB_TO_UART sheet, QSPI FLASH box only.
 *
 * Coordinate transform from PROC106A1_FLASH_USB_TO_UART.SchDoc:
 *   schX = (sourceX - 500) * 0.0254
 *   schY = (sourceY - 290) * 0.0254
 */
export const RadarQspiFlash_MX25V1635FZNQ = (props: SubcircuitProps) => (
  <subcircuit {...props}>
    <schematictext
      text="QSPI FLASH"
      schX={-2.1}
      schY={4.55}
      fontSize={0.46}
      anchor="center"
    />

    <MX25V1635FZNQ name="U9" schX={5.08} schY={-0.381} />

    <resistor
      name="R43"
      resistance="10k"
      footprint="0201"
      schX={-3.302}
      schY={1.016}
      schRotation={90}
    />
    <resistor
      name="R44"
      resistance="10k"
      footprint="0201"
      schX={-2.286}
      schY={1.016}
      schRotation={90}
    />
    <resistor
      name="R45"
      resistance="10k"
      footprint="0201"
      schX={-1.27}
      schY={1.016}
      schRotation={90}
    />

    <resistor
      name="R47"
      resistance="33.2"
      footprint="0201"
      schSize="xs"
      schX={-0.254}
      schY={-0.254}
    />
    <resistor
      name="R6"
      resistance="33.2"
      footprint="0201"
      schSize="xs"
      schX={-0.254}
      schY={-0.508}
    />
    <resistor
      name="R46"
      resistance="33.2"
      footprint="0201"
      schSize="xs"
      schX={-0.254}
      schY={-0.762}
    />
    <resistor
      name="R48"
      resistance="33.2"
      footprint="0201"
      schSize="xs"
      schX={-0.254}
      schY={-1.016}
    />
    <resistor
      name="R49"
      resistance="33.2"
      footprint="0201"
      schSize="xs"
      schX={-0.254}
      schY={-1.27}
    />

    <capacitor
      name="C100"
      capacitance="1uF"
      footprint="0603"
      schX={3.302}
      schY={2.921}
      schRotation={270}
    />
    <capacitor
      name="C101"
      capacitance="0.1uF"
      footprint="0402"
      schX={4.572}
      schY={2.921}
      schRotation={270}
    />

    <trace name="QSPI_CS_PULLUP" from=".U9 > .CS" to=".R43 > .pin1" />
    <trace
      name="QSPI_CS_INTERFACE"
      from=".R43 > .pin1"
      to="net.AR_QSPI_CS"
      schDisplayLabel="AR_QSPI_CS"
    />
    <trace
      name="AR_QSPI_CLK_T"
      from=".R47 > .pin2"
      to=".U9 > .SCLK"
      schDisplayLabel="AR_QSPI_CLK_T"
    />
    <trace
      name="AR_QSPI_D0_T"
      from=".R6 > .pin2"
      to=".U9 > .SI_SIO0"
      schDisplayLabel="AR_QSPI_D0_T"
    />
    <trace
      name="AR_QSPI_D1_T"
      from=".R46 > .pin2"
      to=".U9 > .SO_SIO1"
      schDisplayLabel="AR_QSPI_D1_T"
    />
    <trace
      name="AR_QSPI_D2_T"
      from=".R48 > .pin2"
      to=".U9 > .WP_SIO2"
      schDisplayLabel="AR_QSPI_D2_T"
    />
    <trace
      name="AR_QSPI_D3_T"
      from=".R49 > .pin2"
      to=".U9 > .HOLD_SIO3"
      schDisplayLabel="AR_QSPI_D3_T"
    />

    <trace name="QSPI_D2_PULLUP" from=".R48 > .pin1" to=".R44 > .pin1" />
    <trace
      name="QSPI_D2_INTERFACE"
      from=".R48 > .pin1"
      to="net.AR_QSPI_D2"
      schDisplayLabel="AR_QSPI_D2"
    />
    <trace name="QSPI_D3_PULLUP" from=".R49 > .pin1" to=".R45 > .pin1" />
    <trace
      name="QSPI_D3_INTERFACE"
      from=".R49 > .pin1"
      to="net.AR_QSPI_D3"
      schDisplayLabel="AR_QSPI_D3"
    />
    <trace
      name="QSPI_CLK"
      from=".R47 > .pin1"
      to="net.AR_QSPI_CLK"
      schDisplayLabel="AR_QSPI_CLK"
    />
    <trace
      name="QSPI_D0"
      from=".R6 > .pin1"
      to="net.AR_QSPI_D0"
      schDisplayLabel="AR_QSPI_D0"
    />
    <trace
      name="QSPI_D1"
      from=".R46 > .pin1"
      to="net.AR_QSPI_D1"
      schDisplayLabel="AR_QSPI_D1"
    />

    <trace
      name="FLASH_PULLUP_3V3_R43_R44"
      from=".R43 > .pin2"
      to=".R44 > .pin2"
    />
    <trace
      name="FLASH_PULLUP_3V3_R44_R45"
      from=".R44 > .pin2"
      to=".R45 > .pin2"
    />
    <trace
      name="FLASH_DEVICE_3V3_U9_C100"
      from=".U9 > .VCC"
      to=".C100 > .pin2"
    />
    <trace
      name="FLASH_DEVICE_3V3_C100_C101"
      from=".C100 > .pin2"
      to=".C101 > .pin2"
    />
    <trace name="FLASH_DEVICE_GND" from=".U9 > .GND" to=".U9 > .EP_GND" />
    <trace
      name="FLASH_DECOUPLING_GND"
      from=".C100 > .pin1"
      to=".C101 > .pin1"
    />

    <netlabel
      net="PMIC_3V3"
      schX={2.54}
      schY={3.81}
      anchorSide="bottom"
      connectsTo=".U9 > .VCC"
    />
    <netlabel
      net="PMIC_3V3"
      schX={-3.302}
      schY={2.286}
      anchorSide="bottom"
      connectsTo=".R43 > .pin2"
    />
    <netlabel
      net="GND"
      schX={7.874}
      schY={-1.778}
      anchorSide="top"
      connectsTo=".U9 > .GND"
    />
    <netlabel
      net="GND"
      schX={3.302}
      schY={1.778}
      anchorSide="top"
      connectsTo=".C100 > .pin1"
    />
    {[
      "AR_QSPI_CS",
      "AR_QSPI_CLK",
      "AR_QSPI_D0",
      "AR_QSPI_D1",
      "AR_QSPI_D2",
      "AR_QSPI_D3",
      "PMIC_3V3",
      "GND",
    ].map((net) => (
      <Fragment key={`port-${net}`}>
        <port name={`INTERFACE_${net}`} connectsTo={`net.${net}`} />
      </Fragment>
    ))}
  </subcircuit>
);

export default RadarQspiFlash_MX25V1635FZNQ;
