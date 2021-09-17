require('dotenv').config();
const botPrefix = process.env.BOT_PREFIX;
const Commando = require('discord.js-commando');
const {
	farToCel,
	farToKel,
	celToFar,
	celToKel,
	kelToCel,
	validUnits,
	checkIfUsesDegree,
	kelToFar,
	noConversion,
} = require('./utils/tempconvert');

module.exports = class TemperatureConvertCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'temp-convert',
			group: 'misc',
			memberName: 'temp-convert',
			aliases: ['tempconvert', 'temp-convert', 'tc', 'ct', 'convert-temperature', 'converttemp', 'c-temp'],
			description: 'Convert temperatures.',
			argsType: 'multiple',
		});
	}
	async run(message, args) {
		const initialTemp = parseFloat(args[0]);
		if (!(initialTemp || initialTemp === 0)) {
			message.channel.send(
				`Help: To use command, type \`${botPrefix} temp-convert [temperature] [base unit] [target unit]\`.`
			);
			return;
		}

		if (!args[1] || !args[2]) {
			message.channel.send(`You're missing the base unit and/or the target unit.`);

			return;
		}
		const initialUnit = args[1].toUpperCase();
		const convertedUnit = args[2].toUpperCase();
		if (!(validUnits.includes(initialUnit) && validUnits.includes(convertedUnit))) {
			if (!validUnits.includes(initialUnit)) {
				message.channel.send('The base unit is not a valid temperature unit.');
			}
			if (!validUnits.includes(convertedUnit)) {
				message.channel.send('The target unit is not a valid temperature unit.');
			}
			return;
		}

		const chooseConversionMethod = (initialUnit, convertedUnit) => {
			if (initialUnit === convertedUnit) return noConversion;
			if (initialUnit === 'C' && convertedUnit === 'F') return celToFar;
			if (initialUnit === 'F' && convertedUnit === 'C') return farToCel;
			if (initialUnit === 'F' && convertedUnit === 'K') return farToKel;
			if (initialUnit === 'K' && convertedUnit === 'F') return kelToFar;
			if (initialUnit === 'K' && convertedUnit === 'C') return kelToCel;
			if (initialUnit === 'C' && convertedUnit === 'K') return celToKel;
		};

		const conversionMethod = chooseConversionMethod(initialUnit, convertedUnit);

		message.channel.send(
			`${initialTemp}${checkIfUsesDegree(initialUnit)} ${initialUnit} is ${conversionMethod(
				initialTemp
			)}${checkIfUsesDegree(convertedUnit)} ${convertedUnit}`
		);
		if (initialUnit === convertedUnit) {
			await message.channel.send(`Did you really need me to tell you that? You're a nitwit.`);
		}
	}
};
