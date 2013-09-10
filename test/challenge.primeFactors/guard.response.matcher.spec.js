var matcher = require('../../public/challenge.primeFactors/guard.response.matcher');
var $ = require('jquery');

describe('Guard response matcher,', function() {

	var status;
	var remoteResponse;
	
	beforeEach(function() {
		remoteResponse = { headers: [] };
	});

	it('knows the expected content from the sent request', function() {
		expect(matcher.expectedContent('this-url?number=toto')).toEqual({
			number: 'toto',
			error: 'not a number'
		});
	});
	
});