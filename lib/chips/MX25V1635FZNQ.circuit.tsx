import type { ChipProps } from "@tscircuit/props";
import { Fragment } from "react";
import "tscircuit";

export const MX25V1635FZNQ_PIN_LABELS = {
  pin1: ["CS", "QSPI_CS"],
  pin2: ["SO_SIO1", "QSPI_D1"],
  pin3: ["WP_SIO2", "QSPI_D2"],
  pin4: ["GND", "VSS"],
  pin5: ["SI_SIO0", "QSPI_D0"],
  pin6: ["SCLK", "QSPI_CLK"],
  pin7: ["HOLD_SIO3", "QSPI_D3"],
  pin8: "VCC",
  pin9: ["EP", "EP_GND", "thermalpad"],
} as const;

const renderMx25v1635fznqSymbol = () => {
  const leftPins = [
    { pin: 8, label: "VCC", y: 0.889 },
    { pin: 1, label: "\\CS", y: 0.381 },
    { pin: 6, label: "SCLK", y: 0.127 },
    { pin: 5, label: "SI/SIO0", y: -0.127 },
    { pin: 2, label: "SO/SIO1", y: -0.381 },
    { pin: 3, label: "WP/SIO2", y: -0.635 },
    { pin: 7, label: "HOLD/SIO3", y: -0.889 },
  ] as const;
  const rightPins = [
    { pin: 9, label: "EP", y: -0.635 },
    { pin: 4, label: "GND", y: -0.889 },
  ] as const;

  return (
    <symbol>
      <schematicrect
        schX={0}
        schY={0}
        width={3.048}
        height={2.286}
        strokeWidth={0}
        color="#fff8b5"
        isFilled
      />
      <schematicrect
        schX={0}
        schY={0}
        width={3.048}
        height={2.286}
        strokeWidth={0.03}
        color="#8b5a00"
      />
      {leftPins.map(({ pin, y }) => (
        <Fragment key={`left-symbol-pin-${pin}`}>
          <port
            name={`pin${pin}`}
            pinNumber={pin}
            schX={-2.032}
            schY={y}
            direction="left"
            schStemLength={0.508}
          />
        </Fragment>
      ))}
      {rightPins.map(({ pin, y }) => (
        <Fragment key={`right-symbol-pin-${pin}`}>
          <port
            name={`pin${pin}`}
            pinNumber={pin}
            schX={2.032}
            schY={y}
            direction="right"
            schStemLength={0.508}
          />
        </Fragment>
      ))}
      <schematictext
        text="{NAME}"
        schX={-1.524}
        schY={1.36}
        fontSize={0.18}
        anchor="bottom_left"
      />
      <schematictext
        text="MX25V1635FZNQ"
        schX={-1.524}
        schY={-1.34}
        fontSize={0.16}
        anchor="top_left"
      />
    </symbol>
  );
};

const renderWson8Footprint = () => (
  <footprint>
    {[1, 2, 3, 4].map((pinNumber) => (
      <Fragment key={`left-${pinNumber}`}>
        <smtpad
          portHints={[`pin${pinNumber}`]}
          pcbX={-2.25}
          pcbY={-1.905 + (pinNumber - 1) * 1.27}
          width="0.75mm"
          height="0.5mm"
          shape="rect"
        />
      </Fragment>
    ))}
    {[5, 6, 7, 8].map((pinNumber) => (
      <Fragment key={`right-${pinNumber}`}>
        <smtpad
          portHints={[`pin${pinNumber}`]}
          pcbX={2.25}
          pcbY={1.905 - (pinNumber - 5) * 1.27}
          width="0.75mm"
          height="0.5mm"
          shape="rect"
        />
      </Fragment>
    ))}
    <smtpad
      portHints={["pin9"]}
      pcbX={0}
      pcbY={0}
      width="3.4mm"
      height="3.6mm"
      shape="rect"
    />
    <silkscreenpath
      route={[
        { x: -2.65, y: 3.15 },
        { x: 2.65, y: 3.15 },
        { x: 2.65, y: -3.15 },
        { x: -2.65, y: -3.15 },
        { x: -2.65, y: 3.15 },
      ]}
    />
    <silkscreenpath
      route={[
        { x: -2.35, y: -2.75 },
        { x: -1.95, y: -2.75 },
        { x: -2.15, y: -2.35 },
        { x: -2.35, y: -2.75 },
      ]}
    />
  </footprint>
);

/** Macronix 16 Mbit, 2.5 V serial NOR flash in the eight-lead 5 x 6 mm WSON. */
export const MX25V1635FZNQ = (
  props: ChipProps<typeof MX25V1635FZNQ_PIN_LABELS>,
) => (
  <chip
    manufacturerPartNumber="MX25V1635FZNQ"
    supplierPartNumbers={{ jlcpcb: ["C5139359"] }}
    footprint={renderWson8Footprint()}
    pinLabels={MX25V1635FZNQ_PIN_LABELS}
    pinAttributes={{
      pin4: { requiresGround: true },
      pin8: { requiresPower: true },
      pin9: { requiresGround: true },
    }}
    symbol={renderMx25v1635fznqSymbol()}
    {...props}
  />
);

export default MX25V1635FZNQ;
