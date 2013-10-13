require('../../public/js/utils/string-extensions');

var $ 		= require('jquery');
var array 	= require('../../public/js/utils/array.utils');
var extract = require('../../public/js/utils/array.utils');

describe('School', function() {

	describe('url manipulation', function() {
	
		it('can extracts segments', function() {
			var url = '/players/xorg';
			expect(url.lastSegment()).toEqual('xorg');
		});
	});
	
	describe('Arrays', function() {

		it('can detect an array', function() {
			expect(Array.isArray([])).toBe(true);
		});
		
		it('can build an array from string', function() {
			var player = $.parseJSON('{ "table" : [1, 2] }');
			expect(Array.isArray(player.table)).toBe(true);
		});
		
		it("don't have the extensions when built from a string", function() {
			var player = $.parseJSON('{ "table" : [1, 2] }');
			expect(player.table.select).toBe(undefined);	
		});
		
		it('can remove the last item from an array', function() {
			var table = [1, 2, 3];
			table.pop();
			
			expect(table).toEqual([1, 2]);
		});
		
		it('can remove a given item from an array', function() {
			var table = [1, 2, 3, 4, 5, 6];
			table.splice(3, 2);
			
			expect(table).toEqual([1, 2, 3, 6]);			
		});
		
		it('can identify the index of an element', function() {
			var table = [1, 2, 3, 4, 5, 6];

			expect(table.indexOf(3)).toEqual(2);
		});
	});
	
	describe('array.foreach', function() {
		
		it('can iterate through a collection', function() {
			var sum = 0;						
			array.forEach([1, 2, 3], function(item) {
				sum += item;
			});
			expect(sum).toEqual(6);
		});
		
		it('can extract one item from a collection', function() {
			mouse = { price: 10 };
			keyboard = { price: 100 };
			var ten;
			array.forEach([mouse, keyboard], function(item) {
				if (item.price == 10) {
					ten = item;
				}
			});
			
			expect(ten).toEqual(mouse);
		});
	});
	
	describe('array.first', function() {

		it('can select one item from a collection', function() {
			mouse = { price: 10 };
			keyboard = { price: 100 };
			var ten = array.first([mouse, keyboard], function(item) {
				return item.price == 10;
			});
			
			expect(ten).toEqual(mouse);
		});
		
	});
	
	describe('array.hasOneItemIn', function() {

		it('identify when an item is in a collection', function() {
			mouse = { price: 10 };
			keyboard = { price: 100 };
			var found = array.hasOneItemIn([mouse, keyboard], function(item) {
				return item.price == 10;
			});
			
			expect(found).toBe(true);
		});
		
		it('identify when an item is not in a collection', function() {
			mouse = { price: 10 };
			keyboard = { price: 100 };
			var found = array.hasOneItemIn([mouse, keyboard], function(item) {
				return item.price == 20;
			});
			
			expect(found).toBe(false);
		});
	});
	
	describe('array()', function() {
		
		var withPrice = function(price) {
			return function(item) {
				return item.price == price;
			}
		};
		
		it('can select one item from a collection', function() {
			mouse = { price: 10 };
			keyboard = { price: 100 };
			var ten = extract.firstItemIn([mouse, keyboard], withPrice(10));
			
			expect(ten).toEqual(mouse);
		});
		
	});
	
	describe('object comparaison', function() {
	
		it('considers different objects with different fields', function() {
			expect({ one: 'any' }).not.toEqual({ two: 'any' });
		});
		
		it('considers different objects with same fields and different values', function() {
			expect({ field: 'one' }).not.toEqual({ field: 'two' });
		});
		
		it('considers equal objects with one field and same value', function() {
			expect({ field: 'one' }).toEqual({ field: 'one' });
		});
		
		it('considers equal objects with two fields and same values', function() {
			expect({ one: 'one', two: 'two' }).toEqual({ one: 'one', two: 'two' });
		});
		
		it('considers different objects with two fields and different values', function() {
			expect({ one: 'one', two: 'two' }).not.toEqual({ one: 'one', two: 'not two' });
		});

		it('considers different objects with two fields and same values but different order', function() {
			expect({ one: 'one', two: 'two' }).not.toEqual({ two: 'not two', one: 'one' });
		});
	});
});