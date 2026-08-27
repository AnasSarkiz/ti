import { createINA350DSG } from "./INA350DSG";

/** INA350ABS, gains 10/20. Connect the exposed pad to V_NEG. */
export const INA350ABSIDSGR = createINA350DSG("INA350ABSIDSGR");

export default INA350ABSIDSGR;
