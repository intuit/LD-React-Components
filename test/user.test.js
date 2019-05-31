import User from '../src/lib/LaunchDarklyClient/User';
import { expect } from 'chai';

describe('User: ', () => {
  it.only('User Class', () => {
    const user = new User('autID');
    console.log('authId ', user.authId);
    console.log('country ', user.country);
    user.country = 'USA';
    user.country = null;
    console.log('ip ', user.ip);
    user.ip = 43;
    user.ip = null;

    console.log('tid ', user.tid);
    user.tid = 43;
    user.tid = null;

    user.useragent = 43;
    user.country = null;

    user.tid = 43;
    user.tid = null;

    user.useragent = 43;
    user.useragent = null;

    user.offeringid = 43;
    user.offeringid = null;

    user.test = 43;
    user.test = null;
    user.appid = 43;
    user.appid = null;

    console.log('userage ', user.useragent);
    console.log('user ', user.offeringid);
    console.log('userage ', user.test);
    console.log('userage ', user.appid);
    expect(user).to.not.equal(null);
  });
});
