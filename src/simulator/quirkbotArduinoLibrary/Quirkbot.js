import { createDelayMs, createDelayUs } from './core/createDelay'
import { createDoWhile } from './core/createDoWhile'

export * from './core/constants'
export { Bot } from './Bot'
export { Node } from './Node'

// Inputs
// export { AnalogSensor } from './NodeAnalogSensor'
// export { DigitalSensor } from './NodeDigitalSensor'
// export { CircuitTouch } from './NodeCircuitTouch'
// export { SqueezeSensor } from './NodeSqueezeSensor'
// export { IRProximity } from './NodeIRProximity'
// export { LightSensor } from './NodeLightSensor'
// export { Sonar } from './NodeSonar'

// Brains
// export { Converter } from './NodeConverter'
// export { Comparison } from './NodeComparison'
// export { Constrain } from './NodeConstrain'
// export { Counter } from './NodeCounter'
// export { Gate } from './NodeGate'
// export { List } from './NodeList'
// export { Logic } from './NodeLogic'
// export { Math } from './NodeMath'
// export { Randomizer } from './NodeRandomizer'
// export { Sequence } from './NodeSequence'
// export { Statistics } from './NodeStatistics'
// export { Wave } from './NodeWave'

// Outputs
export { Led } from './NodeLed'
// export { DualColorLed } from './NodeDualColorLed'
// export { ServoMotor } from './NodeServoMotor'
// export { ContinuousServo } from './NodeContinuousServo'
// export { Buzzer } from './NodeBuzzer'
// export { RGBLed } from './NodeRGBLed'
// export { KeyPress } from './NodeKeyPress'
// export { KeySequence } from './NodeKeySequence'
// export { VoltageOutput } from './NodeVoltageOutput'

// Debug
// export { SystemMemory } from './NodeSystemMemory'
// export { SerialMonitor } from './NodeSerialMonitor'
// export { Time } from './NodeTime'

// Overloaded delays and loops
export const delay = createDelayMs()
export const delayMicroseconds = createDelayUs()
export const doWhile = createDoWhile()
