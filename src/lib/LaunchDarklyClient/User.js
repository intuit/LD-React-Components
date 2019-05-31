class User {
  constructor(authId) {
    this._intuit_authid = authId;
  }

  get authId() {
    return this._intuit_authid;
  }

  get country() {
    return this._country;
  }

  set country(country) {
    if (country) {
      this._country = country;
    }
  }

  get ip() {
    return this._ip;
  }

  set ip(ip) {
    if (ip) {
      this._ip = ip;
    }
  }

  get tid() {
    return this._intuit_tid;
  }

  set tid(tid) {
    if (tid) {
      this._intuit_tid = tid;
    }
  }
  get useragent() {
    return this._user_agent;
  }

  set useragent(useragent) {
    if (useragent) {
      this._user_agent = useragent;
    }
  }
  get offeringid() {
    return this._intuit_offeringid;
  }

  set offeringid(offeringid) {
    if (offeringid) {
      this._intuit_offeringid = offeringid;
    }
  }
  get test() {
    return this.intuit_test;
  }

  set test(test) {
    if (test) {
      this.intuit_test = test;
    }
  }
  get appid() {
    return this._intuit_appid;
  }

  set appid(appid) {
    if (appid) {
      this._intuit_appid = appid;
    }
  }
}

module.exports = User;
