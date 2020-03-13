// tslint:disable:no-expression-statement
import test from 'ava';
import { TokenStore } from '..';


test('TokenStore', t => {
  let val = 'aaaaa'
  let ts = new TokenStore()
  ts.saveAccessToken(val)
  t.is(ts.getAccessToken(), val);
});
