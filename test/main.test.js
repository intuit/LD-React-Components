import sinon from 'sinon';
import { expect } from 'chai';
import LDClient from 'ldclient-js';
import LDApi from '../src/lib/LaunchDarklyClient';

let config = {
  environment: 'development',
  features: {
    default: {
      client_key: 'somekey'
    },
    development: {
      client_key: 'somekey'
    },
    user: {
      key: 'test_user'
    },
    timeout: 500
  }
};

const options = {
  baseUrl: 'https://app.launchdarkly.com',
  eventsUrl: 'https://events.launchdarkly.com',
  streamUrl: 'https://stream.launchdarkly.com',
  baseTimeout: 100
};

// mock values to return from mocked functions
const featureValue = true;

const flags = {
  'forms-mode': false,
  'other-forms-mode': false
};

let user = { authId: 'ode_user', country: 'USA' };

const envClientKey = '59x74xxxx9x1x30x6x0x3xxx';

// mock func to init launch darkly
// let ldInit = () => {};
let ldClient;

const variation = () => featureValue;

// Call the callback after 250ms to simulate the delay launch darkly has
const on = (event, cb) => {
  setTimeout(() => {
    if (event === 'ready') {
      cb();
    }
  }, 10);
};

const allFlags = () => flags;

const errorMessage = 'ERROR: Creation of Launch Darkly client has timed out';
const timeout = 500;

describe('Launch Darkly:', () => {
  beforeEach(() => {
    ldClient = sinon.stub(LDClient, 'initialize').callsFake(() => {
      return {
        allFlags,
        variation,
        on
      };
    });
  });

  afterEach(() => {
    if (ldClient !== undefined) {
      ldClient.restore();
    }
  });

  it('init', () => {
    const ldApi = new LDApi('test');
    let client = ldApi.init(user, envClientKey, options, timeout);
    expect(client !== undefined).to.equal(true);
  });

  it('init without option should throw warning', () => {
    const ldApi = new LDApi('test');
    let client = ldApi.init(user, envClientKey, null, timeout);
    console.log('client on without ', client);
    expect(client === undefined).to.equal(true);
  });

  it('initPromise', done => {
    const ldApi = new LDApi('test');

    ldApi.initWithPromise(user, envClientKey, options, timeout).then(client => {
      expect(client !== undefined).to.equal(true);
      done();
    });
  });

  it('createClient', done => {
    const ldApi = new LDApi('test');

    const client = ldApi.createClient(user, envClientKey, options);
    expect(client !== undefined).to.equal(true);
    done();
  });

  it('createClient accepts underscored user keys', done => {
    const ldApi = new LDApi('test');
    const usser = { ...user, key_With_Underscore: 'test' };

    const client = ldApi.createClient(usser, envClientKey, options);
    expect(client !== undefined).to.equal(true);
    done();
  });

  it('createClient no user', done => {
    const ldApi = new LDApi('test');

    try {
      ldApi.createClient(undefined, envClientKey, options);
    } catch (ex) {
      expect(ex !== null).to.equal(true);
      done();
    }
  });

  it('createClient no client key', done => {
    const ldApi = new LDApi('test');

    try {
      ldApi.createClient(user, null, options);
    } catch (ex) {
      expect(ex !== null).to.equal(true);
      done();
    }
  });

  it('createClient no user authID key', done => {
    const ldApi = new LDApi('test');

    const userr = {};
    try {
      ldApi.createClient(userr, null, options);
    } catch (ex) {
      expect(ex !== null).to.equal(true);
      done();
    }
  });

  it('handleEvents', done => {
    const ldApi = new LDApi('test');

    let client = ldApi.createClient(user, envClientKey, options);
    ldApi.handleEvents(timeout, client);
    expect(true).to.equal(true);
    done();
  });

  it('handleEvents promise', done => {
    const ldApi = new LDApi('test');

    new Promise((resolve, reject) => {
      let client = ldApi.createClient(user, envClientKey, options);
      ldApi.handleEvents(timeout, client, false, resolve, reject);
    }).then(
      resolve => {
        expect(true).to.equal(true);
        done();
      },
      reject => {
        expect(reject !== undefined).to.equal(true);
        done();
      }
    );
  });

  it('handleEvents no client', done => {
    const ldApi = new LDApi('test');

    try {
      ldApi.handleEvents(timeout);
    } catch (ex) {
      expect(ex !== null).to.equal(true);
      expect(ex.message === 'ERROR: ldClient is undefined').to.equal(true);
      done();
    }
  });

  it('handleEvents no client with reject callback', done => {
    const ldApi = new LDApi('test');
    const reject = error => {
      expect(error !== null).to.equal(true);
      expect(error.message === 'ERROR: ldClient is undefined').to.equal(true);
      done();
    };

    ldApi.handleEvents(timeout, undefined, undefined, undefined, reject);
  });

  it('handleEvents timeout with reject callback', done => {
    const ldApi = new LDApi('test');

    new Promise((resolve, reject) => {
      let client = ldApi.createClient(user, envClientKey, options);
      ldApi.handleEvents(1, client, false, resolve, reject);
    }).then(
      resolve => {},
      reject => {
        expect(reject.message).to.equal('ERROR: Creation of Launch Darkly client has timed out');
        done();
      }
    );
  });

  it('handleEvents error event', done => {
    const events = {};
    const ldApi = new LDApi();
    const mockClient = {
      emit: (event, ...args) => (events[event] ? events[event](...args) : null),
      on: (event, cb) => {
        events[event] = cb;
      }
    };
    ldApi.handleEvents(timeout, mockClient, false, null, error => {
      expect(error.message).to.equal('Testing Error');
      done();
    });
    mockClient.emit('error', Error('Testing Error'));
  });

  it('getFeatureFlag throws and error when there is no default value provided', done => {
    const noClientLDAPI = new LDApi('test');
    noClientLDAPI.init(user, envClientKey, options, 500, LDClient);

    try {
      noClientLDAPI.getFeatureFlag(undefined, 'defaultValue');
      done();
    } catch (ex) {
      expect(ex !== null).to.equal(true);
      // eslint-disable
      expect(ex.message === 'ERROR: featureId is undefined').to.equal(true);
      done();
    }
    try {
      noClientLDAPI.getFeatureFlag(config.features);
      done();
    } catch (ex) {
      expect(ex !== null).to.equal(true);
      // eslint-disable
      expect(ex.message).to.equal('Default value must be passed to getPromiseFeatureFlag');
    }
  });

  it('getFeatureFlag returns default value when there is no ldClient but a default value(false) is provided', done => {
    const noClientLDAPI = new LDApi('test');
    const expected = false;
    const actual = noClientLDAPI.getFeatureFlag(config.features, false);
    // t.is(actual, expected);
    expect(actual).to.equal(expected);
    done();
  });

  it("getAllFlags returns an empty object if the ldclient doesn't exist", done => {
    const noClientLDAPI = new LDApi('test');
    const expected = {};
    const actual = noClientLDAPI.getAllFlags();
    expect(actual).to.deep.equal(expected);
    done();
  });

  it('LD API initializes with appropriate api', done => {
    // Initialize the api with the mocked LDClient and the config
    const ldApi = new LDApi('test');

    ldApi.init(user, envClientKey, options, 500);
    expect(typeof ldApi.getFeatureFlag).to.equal('function');
    expect(typeof ldApi.getAllFlags).to.equal('function');
    done();
  });

  it('LD API returns promise that will return a ready client', done => {
    const ldApi = new LDApi('test');

    // The 'ready' event will be emitted within 500ms, resolving the promise and returning the client
    ldApi.initWithPromise(user, envClientKey, options, 500).then(client => {
      expect(typeof client.getFeatureFlag).to.equal('function');
      expect(typeof client.getAllFlags).to.equal('function');
      done();
    });
  });

  it('LD API returns promise that rejects if the client does not initialize in time', done => {
    const ldApi = new LDApi('test');

    // Only wait 100ms for the on ready event, the promise will reject
    ldApi.initWithPromise(user, envClientKey, options, 1).catch(err => {
      expect(err.message).to.deep.equal(errorMessage);
      done();
      // t.deepEqual(err.message, errorMessage);
    });
  });

  it('getFeatureFlag returns the feature value', done => {
    const ldApi = new LDApi('test');
    ldApi.init(user, envClientKey, options, 500, LDClient);
    const expected = true;
    const actual = ldApi.getFeatureFlag(config.features, false);
    expect(actual).to.equal(expected);
    done();
  });

  it('getPromiseFeatureFlag returns reject when there is no default value is provided', done => {
    const noClientLDAPI = new LDApi('test');
    // const expected = false;

    noClientLDAPI.getPromiseFeatureFlag(config.features).catch(err => {
      // t.deepEqual(err.message, 'Default value must be passed to getPromiseFeatureFlag');
      // eslint-disable
      expect(err.message).to.equal('Default value must be passed to getPromiseFeatureFlag');
      done();
    });
  });

  it('getAllFlags returns all flags belonging to that userKey', done => {
    const ldApi = new LDApi('test');
    ldApi.init(user, envClientKey, options, 500, LDClient);
    const expected = {
      'forms-mode': false,
      'other-forms-mode': false
    };
    const actual = ldApi.getAllFlags();
    // t.deepEqual(actual, expected);
    expect(actual).to.deep.equal(expected);
    done();
  });
});
