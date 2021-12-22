require('dotenv').config();
const botPrefix = process.env.BOT_PREFIX;
const Commando = require('discord.js-commando');

const milesToKilometers = mi => mi * 1.609344;
const kilometersToMiles = km => km * 0.621371;

const validUnits = ['mi', 'km'];
const noConversion = distance => distance;

class DistanceConvertCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'distance-convert',
			group: 'misc',
			memberName: 'distance-convert',
			aliases: ['dc'],
			description: 'Convert distances',
			argsType: 'multiple',
		});
	}
	async run(message, args) {
		const initialDistance = parseFloat(args[0]);
		if (!(initialDistance || initialDistance === 0)) {
			message.channel.send(
				`Help: To use command, type \`${botPrefix} temp-convert [temperature] [base unit] [target unit]\`.`
			);
			return;
		}

		if (!args[1] || !args[2]) {
			message.channel.send(`You're missing the base unit and/or the target unit.`);

			return;
		}

		const initialUnit = args[1];
		const convertedUnit = args[2];
		console.log(convertedUnit);

		if (!(validUnits.includes(initialUnit) && validUnits.includes(convertedUnit))) {
			if (!validUnits.includes(initialUnit)) {
				message.channel.send('The base unit is not a valid measurement unit.');
			}
			if (!validUnits.includes(convertedUnit)) {
				message.channel.send('The target unit is not a valid measurement unit.');
			}
			return;
		}

		const chooseConversionMethod = (initialUnit, convertedUnit) => {
			if (initialUnit === convertedUnit) return noConversion;
			if (initialUnit === 'mi' && convertedUnit === 'km') return milesToKilometers;
			if (initialUnit === 'km' && convertedUnit === 'mi') return kilometersToMiles;
		};

		const conversionMethod = chooseConversionMethod(initialUnit, convertedUnit);

		const convertedDistance = conversionMethod(initialDistance).toFixed(2);

		message.channel.send(
			`${initialDistance}${initialUnit} is ${convertedDistance}${convertedUnit}`
		);

		if (initialUnit === convertedUnit) {
			await message.channel.send(`Did you really need me to tell you that? You're a nitwit.`);
		}
	}
}

module.exports = DistanceConvertCommand;
