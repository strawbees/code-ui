export const COMMANDS = {
	Sync                     : 0x1B,
	GetBlockWriteSupport     : 0x62,
	BlockWrite               : 0x42,
	BlockRead                : 0x67,
	ReadSignature            : 0x73,
	ReadBootloaderSWVersion  : 0x56,
	ReadBootloaderIdentifier : 0x53,
	ReadBootloaderInterface  : 0x70,
	SetCurrentAddress        : 0x41,
	ReadAutoAddressIncrement : 0x61,
	ReadPartCode             : 0x74,
	EnterProgrammingMode     : 0x50,
	LeaveProgrammingMode     : 0x4c,
	SelectDeviceType         : 0x54,
	EnterBootloader          : 0xb,
	ExitBootloader           : 0x45,
	ReadUUID                 : 0x55,
}
export const REPORT_DELIMITERS = {
	Start         : 0xFA,
	End           : 0xFF,
	UUID          : 0xFB,
	NumberOfNodes : 0xFC,
	NodeContent   : 0xFD,
}
export const UUID_SIZE = 16
export const PAGE_SIZE = 128
export const PROGRAM_ADDRESS = 0
