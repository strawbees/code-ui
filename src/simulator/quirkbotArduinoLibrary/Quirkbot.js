import { createDelayMs, createDelayUs } from './core/createDelay'
import { createDoWhile } from './core/createDoWhile'

export * from './core/constants'
export * from './Bot'
export * from './Node'

// Inputs
// export * from './NodeAnalogSensor'
// export * from './NodeDigitalSensor'
// export * from './NodeCircuitTouch'
// export * from './NodeSqueezeSensor'
// export * from './NodeIRProximity'
// export * from './NodeLightSensor'
// export * from './NodeSonar'

// Brains
// export * from './NodeConverter'
// export * from './NodeComparison'
// export * from './NodeConstrain'
// export * from './NodeCounter'
// export * from './NodeGate'
// export * from './NodeList'
// export * from './NodeLogic'
// export * from './NodeMath'
// export * from './NodeRandomizer'
// export * from './NodeSequence'
// export * from './NodeStatistics'
export * from './NodeWave'

// Outputs
export * from './NodeLed'
// export * from './NodeDualColorLed'
// export * from './NodeServoMotor'
// export * from './NodeContinuousServo'
// export * from './NodeBuzzer'
// export * from './NodeRGBLed'
// export * from './NodeKeyPress'
// export * from './NodeKeySequence'
// export * from './NodeVoltageOutput'

// Debug
// export * from './NodeSystemMemory'
// export * from './NodeSerialMonitor'
// export * from './NodeTime'

// Overloaded delays and loops
export const delay = createDelayMs()
export const delayMicroseconds = createDelayUs()
export const doWhile = createDoWhile()
