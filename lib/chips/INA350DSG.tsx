import type { ChipProps } from "@tscircuit/props";

const pinLabels = {
  pin1: ["GS"],
  pin2: ["IN_NEG", "IN_MINUS"],
  pin3: ["IN_POS", "IN_PLUS"],
  pin4: ["V_NEG", "V_MINUS"],
  pin5: ["REF"],
  pin6: ["OUT"],
  pin7: ["V_POS", "V_PLUS", "VS"],
  pin8: ["SHDN", "N_SHDN"],
  pin9: ["EP", "PAD"],
} as const;

/** Shared DSG0008A WSON pinout and land pattern for both gain variants. */
export const createINA350DSG =
  (manufacturerPartNumber: "INA350ABSIDSGR" | "INA350CDSIDSGR") =>
  (props: ChipProps<typeof pinLabels>) => (
    <chip
      pinLabels={pinLabels}
      manufacturerPartNumber={manufacturerPartNumber}
      datasheetUrl="https://www.ti.com/lit/ds/symlink/ina350.pdf"
      schWidth={2.8}
      schHeight={3.2}
      schPinArrangement={{
        leftSide: { direction: "top-to-bottom", pins: ["IN_NEG", "IN_POS"] },
        rightSide: { direction: "top-to-bottom", pins: ["OUT", "REF"] },
        topSide: { direction: "left-to-right", pins: ["SHDN", "V_POS", "GS"] },
        bottomSide: { direction: "left-to-right", pins: ["V_NEG", "EP"] },
      }}
      schPinStyle={{
        IN_POS: { marginTop: 0.8 },
        REF: { marginTop: 0.8 },
        V_POS: { marginLeft: 0.6 },
        GS: { marginLeft: 0.6 },
        EP: { marginLeft: 0.6 },
      }}
      footprint={
        <footprint>
          {/* TI DSG0008A land pattern: 0.5 mm pitch, 1.9 mm row spacing. */}
          <smtpad
            portHints={["pin1"]}
            pcbX={-0.95}
            pcbY={0.75}
            width={0.5}
            height={0.25}
            shape="rect"
          />
          <smtpad
            portHints={["pin2"]}
            pcbX={-0.95}
            pcbY={0.25}
            width={0.5}
            height={0.25}
            shape="rect"
          />
          <smtpad
            portHints={["pin3"]}
            pcbX={-0.95}
            pcbY={-0.25}
            width={0.5}
            height={0.25}
            shape="rect"
          />
          <smtpad
            portHints={["pin4"]}
            pcbX={-0.95}
            pcbY={-0.75}
            width={0.5}
            height={0.25}
            shape="rect"
          />
          <smtpad
            portHints={["pin5"]}
            pcbX={0.95}
            pcbY={-0.75}
            width={0.5}
            height={0.25}
            shape="rect"
          />
          <smtpad
            portHints={["pin6"]}
            pcbX={0.95}
            pcbY={-0.25}
            width={0.5}
            height={0.25}
            shape="rect"
          />
          <smtpad
            portHints={["pin7"]}
            pcbX={0.95}
            pcbY={0.25}
            width={0.5}
            height={0.25}
            shape="rect"
          />
          <smtpad
            portHints={["pin8"]}
            pcbX={0.95}
            pcbY={0.75}
            width={0.5}
            height={0.25}
            shape="rect"
          />
          <smtpad
            portHints={["pin9"]}
            pcbX={0}
            pcbY={0}
            width={0.9}
            height={1.6}
            shape="rect"
          />
          <silkscreenpath
            route={[
              { x: -1, y: 1.1 },
              { x: 1, y: 1.1 },
            ]}
            strokeWidth={0.1}
          />
          <silkscreenpath
            route={[
              { x: -1, y: -1.1 },
              { x: 1, y: -1.1 },
            ]}
            strokeWidth={0.1}
          />
          <silkscreenpath
            route={[
              { x: -1.45, y: 0.65 },
              { x: -1.45, y: 0.9 },
              { x: -1.2, y: 1.1 },
            ]}
            strokeWidth={0.1}
          />
          <silkscreentext
            text="{NAME}"
            pcbX={0}
            pcbY={1.7}
            fontSize={0.6}
            anchorAlignment="center"
          />
          <courtyardoutline
            outline={[
              { x: -1.6, y: 1.3 },
              { x: 1.45, y: 1.3 },
              { x: 1.45, y: -1.3 },
              { x: -1.6, y: -1.3 },
              { x: -1.6, y: 1.3 },
            ]}
          />
        </footprint>
      }
      {...props}
    />
  );
