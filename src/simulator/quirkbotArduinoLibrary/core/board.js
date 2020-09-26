// QuirkbotArduinoHardare/avr/variants/quirkbot/pins_arduino.h ----------------
export const NUM_DIGITAL_PINS = 30
export const NUM_ANALOG_INPUTS = 12

export const SDA = 2
export const SCL = 3
export const LED_BUILTIN = 13

// Map SPI port to 'new' pins D14..D17
export const SS = 17
export const MOSI = 16
export const MISO = 14
export const SCK = 15

// Mapping of analog pins as digital I/O
// A6-A11 share with digital pins
export const A0 = 18
export const A1 = 19
export const A2 = 20
export const A3 = 21
export const A4 = 22
export const A5 = 23
export const A6 = 24	// D4
export const A7 = 25	// D6
export const A8 = 26	// D8
export const A9 = 27	// D9
export const A10 = 28	// D10
export const A11 = 29	// D12

// QuirkbotArduinoHardare/avr/variants/quirkbot/QuirkbotBoard.h ----------------
export const QB_BOARD = true

// BOARD LOCATIONS -------------------------------------------------------------

// No Location
export const DISCONNECTED = 999
export const NO_LOCATION = DISCONNECTED

// Built in LEDs
export const LM = 106 // Left Mouth (PD5)
export const RM = 107 // Right Mouth (PB0)
export const PLACE_LEFT_MOUTH = LM
export const PLACE_RIGHT_MOUTH = RM

export const LE = 8 // Left Eye   (PB4) ADC11
export const RE = A5 // Right Eye (PF0) ADC0
export const PLACE_LEFT_EYE = LE
export const PLACE_RIGHT_EYE = RE

// Limbs
export const LL = 100 // Left Leg
export const RL = 101 // Right Leg
export const RA = 102 // Right Arm
export const H = 103 // Horn
export const LA = 105 // Left Arm
export const PLACE_LEFT_LEG = LL
export const PLACE_RIGHT_LEG = RL
export const PLACE_LEFT_ARM = LA
export const PLACE_RIGHT_ARM = RA
export const PLACE_HORN = H

export const LLF = 9 // Left Leg Front (PB5) ADC12 PWM (16BIT)
export const RLF = 11 // Right Leg Front (PB7) PWM (8/16BIT)
export const RAF = 5 // Right Arm Front (PC6) PWM (HS)
export const HF = 13 // Horn Front (PC7) PWM (10BIT)
export const LAF = 10 // Left Arm Front (PB6) ADC13 PWM (16BIT)
export const PLACE_LEFT_LEG_FRONT = LLF
export const PLACE_RIGHT_LEG_FRONT = RLF
export const PLACE_LEFT_ARM_FRONT = LAF
export const PLACE_RIGHT_ARM_FRONT = RAF
export const PLACE_HORN_FRONT = HF

export const LLB = A0 // Left Leg Back (PF7) ADC7
export const RLB = A4 // Right Leg Back (PF1) ADC1
export const RAB = A3 // Right Arm Back (PF4) ADC4
export const HB = A2 // Horn Back (PF5) ADC5
export const LAB = A1 // Left Arm Back (PF6) ADC6
export const PLACE_LEFT_LEG_BACK = LLB
export const PLACE_RIGHT_LEG_BACK = RLB
export const PLACE_LEFT_ARM_BACK = LAB
export const PLACE_RIGHT_ARM_BACK = RAB
export const PLACE_HORN_BACK = HB

// Backpack
export const BP1 = A7 // Back Pack 1 (PD7) ADC10 PWM (HS) Uppmost left
export const BP2 = A11 // Back Pack 2 (PD6) ADC9
export const BP3 = 0 // Back Pack 3 (PD2) RXD1
export const BP4 = 2 // Back Pack 4 (PD1) SDA
export const BP5 = 3 // Back Pack 5 (PD0) SCL
export const BP6 = 1 // Back Pack 6 (PD3) TXD1
export const PLACE_BP1 = BP1
export const PLACE_BP2 = BP2
export const PLACE_BP3 = BP3
export const PLACE_BP4 = BP4
export const PLACE_BP5 = BP5
export const PLACE_BP6 = BP6
export const SERVO_BP1 = BP6
export const SERVO_BP2 = BP3
export const SERVO_MOTOR_1 = BP6
export const SERVO_MOTOR_2 = BP3
export const PLACE_SERVO_MOTOR_1 = BP6
export const PLACE_SERVO_MOTOR_2 = BP3

// Pull up pin
export const PULL_UP_PIN = 4

// UUID
export const QB_UUID_SIZE = 16
