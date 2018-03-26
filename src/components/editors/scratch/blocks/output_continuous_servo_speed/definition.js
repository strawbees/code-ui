export default () => ({
	"message0": "set continuos servo %1 speed to %2",
	"args0": [
		{
			"type": "field_dropdown",
			"name": "PLACE",
			"options": [
				["1", "SERVO_MOTOR_1"],
				["2", "SERVO_MOTOR_2"]
			]
		},
		{
			"type" : "input_value",
			"name" : "SPEED",
			"check" : "Number"
		}
	],
	"previousStatement": null,
	"nextStatement": null,
	"category": "input",
	"colour": "#f580c5",
	"colourSecondary": "#f75abb",
	"colourTertiary": "#f442b0"
})
