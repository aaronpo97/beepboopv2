module.exports = {
	validUnits: ['C', 'F', 'K'],
	celToFar: cel => cel * (9 / 5) + 32,
	farToCel: far => (far - 32) * (5 / 9),
	celToKel: cel => cel + 273.15,
	kelToCel: kel => kel - 273.15,
	farToKel: far => this.celToKel(farToCel(far)),
	kelToFar: kel => this.celToFar(kelToCel(kel)),
	checkIfUsesDegree: unit => (unit === 'K' ? '' : '°'),
	noConversion: temp => temp,
};
