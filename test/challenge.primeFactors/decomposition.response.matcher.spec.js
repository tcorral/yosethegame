var matcher = require('../../public/challenge.primeFactors/decomposition.response.matcher');

describe('Decomposition response matcher,', function() {

	it('knows the expected answer from the sent request', function() {
		expect(matcher.expectedContent('this-url?number=300')).toEqual({
			number: 300,
			decomposition: [2, 2, 3, 5, 5]
		});
	});
	
});