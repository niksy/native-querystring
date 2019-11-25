import assert from 'assert';

import * as qs from '../index';

describe('test-querystring-unescape', function() {
  it('does basic unescaping', function() {
    assert.deepEqual(qs.unescape('5'), '5');
    assert.deepEqual(qs.unescape('test'), 'test');
    assert.deepEqual(qs.unescape('%5Bobject+Object%5D'), '[object Object]');
    assert.deepEqual(qs.unescape('5%2C10'), '5,10');
    assert.deepEqual(qs.unescape('%C5%8A%C5%8D%C4%91%C4%95'), 'Ŋōđĕ');
    assert.deepEqual(qs.unescape('test%C5%8A%C5%8D%C4%91%C4%95'), 'testŊōđĕ');
    assert.deepEqual(qs.unescape('%EF%BF%BDtest'), '�test');
  });

  it('using JSON objects', function() {
    assert.strictEqual(
      qs.unescape(JSON.stringify({test: 5, toString: () => 'test', valueOf: () => 10 })),
      '{"test":5}'
    );
  });

  it('throws when given Symbol', function() {
    try {
      qs.unescape(Symbol('test'));
    } catch (error) {
      if (error instanceof TypeError && /[sS]ymbol.+string/.test(error.message)) {
        assert.ok(true);
      } else {
        throw error;
      }
    }
  });
});
