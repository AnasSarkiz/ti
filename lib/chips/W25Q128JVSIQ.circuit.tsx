import type { ChipProps } from "@tscircuit/props";

const pinLabels = {
  pin1: ["QSPI_CS", "SPI_CS", "CS"],
  pin2: ["QSPI_IO1", "SPI_MISO", "DO_IO1", "DO", "IO1"],
  pin3: ["QSPI_IO2", "SPI_WP", "WP_IO2", "WP", "IO2"],
  pin4: ["VSS", "GND"],
  pin5: ["QSPI_IO0", "SPI_MOSI", "DI_IO0", "DI", "IO0"],
  pin6: ["QSPI_SCK", "SPI_SCK", "CLK"],
  pin7: ["QSPI_IO3", "SPI_HOLD", "HOLD_IO3", "HOLD", "IO3"],
  pin8: ["VCC"],
} as const;

export const W25Q128JVSIQ = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      supplierPartNumbers={{
        jlcpcb: ["C97521"],
      }}
      manufacturerPartNumber="W25Q128JVSIQ"
      footprint="soic8_pillpads_w9.31mm_pw0.63mm_pl2.26mm_pin1location(leftside,bottom)"
      cadModel={{
        objUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C97521.obj?uuid=4652e19b90fa4dbb8662aa4cba61a532",
        stepUrl:
          "https://modelcdn.tscircuit.com/easyeda_models/assets/C97521.step?uuid=4652e19b90fa4dbb8662aa4cba61a532",
        pcbRotationOffset: 0,
        modelOriginPosition: {
          x: 0.000012700000070253736,
          y: -0.000012699999956566899,
          z: -0.069425,
        },
      }}
      {...props}
    />
  );
};
