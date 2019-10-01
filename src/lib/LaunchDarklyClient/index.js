import hash from 'hash.js';
import * as LDClient from 'ldclient-js';

class LDApi {
  constructor(env) {
    this.ldClient = null;
    this.featureFlags = null;
    this.env = env;
  }

  init(user, envClientKey, options, timeout, logUpdates = false) {
    // makes the flags available to the client
    this.ldClient = this.createClient(user, envClientKey, options);
    if (!options) {
      return console.log('Endpoint Options is not provided');
    }
    // returns the library and it's methods to use outside of the module
    this.handleEvents(
      (timeout = options.baseTimeout),
      this.ldClient,
      logUpdates,
    );
    return this;
  }

  /**
   * Initializes the launch darkly client and returns a promise to ensure that
   * methods won't be called until the client emits the 'ready' event
   */
  initWithPromise(user, envClientKey, options, timeout, logUpdates = false) {
    this.ldClient = this.createClient(user, envClientKey, options);

    return new Promise((resolve, reject) => {
      return this.handleEvents(
        timeout,
        this.ldClient,
        logUpdates,
        resolve,
        reject,
      );
    });
  }

  /**
   * Create the LD client
   *
   * @param user user object
   * @param envClientKey SDK key for the env
   * @returns {*}
   */
  createClient(user, envClientKey, options) {
    if (typeof user.authId === 'undefined') {
      throw new Error('AuthId was not passed to launchDarkly client');
    }

    if (!envClientKey) {
      throw new Error('There was no environment key provided.');
    }

    const ldUser = {
      key: hash
        .sha256()
        .update(user.authId)
        .digest('hex'),
      custom: {},
    };

    // take whatever is in the tags object and put it into the user object
    if (user !== undefined) {
      for (const key in user) {
        let userKey = key;
        if (key.indexOf('_') > -1) {
          userKey = key.replace('_', '');
        }

        if (key === 'authId') {
          user[key] = hash
            .sha256()
            .update(user[key])
            .digest('hex');
        }

        ldUser.custom[userKey] = user[key];
      }
    }
    return this.env === 'test'
      ? LDClient.default.initialize(envClientKey, ldUser, options)
      : LDClient.initialize(envClientKey, ldUser, options);
  }

  /**
   * LD client posts events.  This function handles them.  First set a timeout for the ready event.  If it takes too long time out.
   * Log updates when they happen
   *
   * @param timeout LD client timeout
   * @param ldClient initialized client
   * @param logUpdates Set to true if you want to see the update events
   */
  handleEvents(timeout, ldClient, logUpdates = false, resolve, reject) {
    if (ldClient === undefined) {
      const error = new Error('ERROR: ldClient is undefined');
      if (reject !== undefined) {
        return reject(error);
      }
      throw error;
    }

    const initTimeout = setTimeout(() => {
      clearTimeout(initTimeout);
      const error = new Error(
        'ERROR: Creation of Launch Darkly client has timed out',
      );
      if (reject !== undefined) {
        return reject(error);
      }
      throw error;
    }, timeout);

    ldClient.on('error', error => {
      if (reject !== undefined) {
        return reject(error);
      }
      throw error;
    });

    ldClient.on('ready', () => {
      clearTimeout(initTimeout);

      if (resolve !== undefined) {
        return resolve(this);
      }
    });
  }

  /**
   * Grab the feature flag value.  If the LD client does not exist return the default
   * value.
   *
   * @param featureId LD feature flag id
   * @param defaultValue boolean value that is the default (this is used we can get the feature flag from LD)
   * @returns {object} Value of feature flag. Flags can be boolean or enums, depending on their configuration
   */
  getFeatureFlag(featureId, defaultValue) {
    if (defaultValue === undefined) {
      throw new Error('Default value must be passed to getPromiseFeatureFlag');
    }
    if (!this.ldClient) {
      return defaultValue;
    }
    console.log('featureId ', featureId);
    if (!featureId) {
      throw new Error('ERROR: featureId is undefined');
    }
    return this.ldClient.variation(featureId, defaultValue);
  }

  /**
   * Grab the feature flag value resolved as a Promise  If the LD client does not exist return the default
   * value.
   *
   * @param featureFlag LD feature flag id
   * @param defaultValue boolean value (this is used we can get the feature flag from LD)
   * @returns {object} Value of feature flag as a promise. Flags can be boolean or enums, depending on their configuration
   */
  getPromiseFeatureFlag(featureFlag, defaultValue) {
    return new Promise((resolve, reject) => {
      resolve(this.getFeatureFlag(featureFlag, defaultValue));
    });
  }

  /**
   * Grab All feature flags for the user.  If the LD client does not exist, return the default
   * value.
   *
   * @returns {object} Value of feature flags. Flags can be boolean or enums, depending on their configuration
   */

  getAllFlags() {
    if (!this.ldClient) {
      return {};
    }

    return this.ldClient.allFlags();
  }
}

module.exports = LDApi;
