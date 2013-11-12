var $ = require('jquery');

describe('json parsing', function() {
   
   it('can parse an object using native JSON', function() {
       var response = JSON.parse('{"alive":true}');
       expect(response.alive).toBe(true);
   });
    
   it('can parse an object using jQuery', function() {
       var response = $.parseJSON('{"alive":true}');
       expect(response.alive).toBe(true);
   });
});