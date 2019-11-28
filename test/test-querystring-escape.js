/*
 * https://github.com/nodejs/node/blob/v13.2.0/test/parallel/test-querystring-escape.js
 * https://github.com/SpainTrain/querystring-es3/blob/master/test/test-querystring-escape.js
 */

import assert from 'assert';
import * as qs from '../index';

describe('test-querystring-escape', function() {
	it('does basic escaping', function() {
		assert.deepEqual(qs.escape(5), '5');
		assert.deepEqual(qs.escape('test'), 'test');
		assert.deepEqual(qs.escape({}), '%5Bobject+Object%5D');
		assert.deepEqual(qs.escape([5, 10]), '5%2C10');
		assert.deepEqual(qs.escape('Ŋōđĕ'), '%C5%8A%C5%8D%C4%91%C4%95');
		assert.deepEqual(qs.escape('testŊōđĕ'), 'test%C5%8A%C5%8D%C4%91%C4%95');
		assert.deepEqual(qs.escape('�test'), '%EF%BF%BDtest');
	});

	it('using toString for objects', function() {
		assert.strictEqual(
			qs.escape({ test: 5, toString: () => 'test', valueOf: () => 10 }),
			'test'
		);
	});

	it('toString is not callable, must throw an error', function() {
		assert.throws(() => qs.escape({ toString: 5 }));
	});

	it('should use valueOf instead of non-callable toString', function() {
		assert.strictEqual(
			qs.escape({ toString: 5, valueOf: () => 'test' }),
			'test'
		);
	});

	it('throws when given Symbol', function() {
		try {
			qs.escape(Symbol('test'));
		} catch (error) {
			if (
				error instanceof TypeError &&
				/[sS]ymbol.+string/.test(error.message)
			) {
				assert.ok(true);
			} else {
				throw error;
			}
		}
	});
});
