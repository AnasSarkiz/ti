import {
  CommunicationInterface_TCAN1042_TIDA01428,
  ElectrochromicMirrorDriver_TIDA01539,
  LampDriver_TPS92638_TIDA00356,
  LightSensor_OPT3001_TIDA01539,
  PowerSupply_LM74202_TPS7E81_Q1,
  TemperatureSensor_LM50HV_Q1,
} from "@tsci/tscircuit.ti";
import "tscircuit";

export default () => (
  <board>
    <PowerSupply_LM74202_TPS7E81_Q1 name="power_supply" />
    <CommunicationInterface_TCAN1042_TIDA01428 name="communication_interface" />
    <ElectrochromicMirrorDriver_TIDA01539 name="mirror_driver" />
    <LightSensor_OPT3001_TIDA01539 name="light_sensor" />
    <LampDriver_TPS92638_TIDA00356 name="lamp_driver" />
    <TemperatureSensor_LM50HV_Q1 name="temperature_sensor" />
  </board>
);
