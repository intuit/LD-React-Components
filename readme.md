<div align="center">
  <img width="267" height="136"
    src="https://raw.githubusercontent.com/intuit/LD-React-Components/readme-updates/ld-react-components.png?token=AAQ4JVDK2HU6BW3BFQJPDT25BAM4O">
  <h1>LD React Components</h1>
  <p>Semantic component helpers to support LaunchDarkly in your react app.</p>
</div>

<div align="center"><a href="https://circleci.com/gh/intuit/LD-React-Components"><img alt="CircleCI" src="https://img.shields.io/circleci/build/github/intuit/LD-React-Components.svg?style=flat-square&logo=circleci&token=df1c1f6aab7a369b9957bf8aaf8642e1c5b3dda5"></a> <a href="https://codecov.io/gh/intuit/auto"><img src="https://img.shields.io/codecov/c/github/intuit/auto.svg?style=flat-square&logo=codecov" alt="Codecov" /></a> <a href="https://www.npmjs.com/package/LD-React-Components"><img src="https://img.shields.io/npm/v/ld-react-components.svg?style=flat-square&logo=npm" alt="npm" /></a> <a href="https://www.npmjs.com/package/ld-react-components"><img src="https://img.shields.io/npm/dt/ld-react-components.svg?style=flat-square&logo=npm" alt="npm" /></a> <a href="https://app.snyk.io/org/poorpaddy/project/c1415dab-3e6f-4438-8e73-26a3e5ce9f55"><img src="https://img.shields.io/snyk/vulnerabilities/github/intuit/LD-React-Components/package.json.svg?style=flat-square&logo=snyk&logoColor=lightgrey" alt="" /></a> <a href="https://app.fossa.com/projects/git%2Bgithub.com%2Fintuit%2FLD-React-Components?ref=badge_shield" alt="FOSSA Status"><img src="https://app.fossa.com/api/projects/git%2Bgithub.com%2Fintuit%2FLD-React-Components.svg?type=shield"/></a> <a href="https://github.com/prettier/prettier"><img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square&logo=producthunt" alt="code style: prettier" /></a></div>

## Usage

Install node module

You can use `npm` or `yarn` however it is advised to choose one and stick with it. For the purposes of documentation `yarn` is being used.

```shell
yarn add ld-react-components
```

### Importing the components

```js
import {
  FeatureFlag,
  FeatureSwitch,
  FeatureCase,
  FeatureTrue,
  FeatureFalse
} from 'ld-react-components';
```

#### API initialization

```js
this._ldclientPromise = launchDarklyClient.initWithPromise(
  user,
  this._sdkKey,
  500
);

const endpoints = {
  baseUrl: 'https://app.launchdarkly.com',
  eventsUrl: 'https://events.launchdarkly.com',
  streamUrl: 'https://stream.launchdarkly.com',
  baseTimeout: 100
};

this._ldclientPromise = launchDarklyClient.initWithPromise(
  user,
  this._sdkKey,
  endpoints,
  500
);
```

### FeatureFlag

Takes `flagKey` and `appFlags` as `props`, which is an object containing list of features.

```jsx
const applicationKeys = {
  'integration-test': true,
  'multivariate-test': 'multivariate-test-1'
}
<FeatureFlag flagKey="multivariate-test" appFlags={applicationKeys}></FeatureFlag>
```

### FeatureSwitch, FeatureCase and FeatureDefault

`FeatureSwitch` should be a child of `FeatureFlag` and can take `FeatureCase` and `FeatureDefault` as children.

`FeatureCase` component takes `condition` and `allowBreak`(a boolean) as props,
`condition` is the `case` feature, while `allowBreak` used as a `break`. The reason for name change is `case` and `break` are reserved words on JS.

```jsx
<FeatureFlag flagKey="multivariate-test" appFlags={applicationKeys}>
  <FeatureSwitch>
    <FeatureCase condition="multivariate-test-1" allowBreak>
      <p>Multivariate Test 1 Rendered</p>
    </FeatureCase>
    <FeatureCase condition="multivariate-test-2" allowBreak>
      <p>Multivariate Test 2 Rendered</p>
    </FeatureCase>
    <FeatureCase condition="multivariate-test-3" allowBreak>
      <p>Multivariate Test 3 Rendered</p>
    </FeatureCase>
    <FeatureCase condition="multivariate-test-4" allowBreak>
      <p>Multivariate Test 4 Rendered</p>
    </FeatureCase>
    <FeatureDefault>
      <p>If no conditions are met then render the default</p>
    </FeatureDefault>
  </FeatureSwitch>
</FeatureFlag>
```

### FeatureTrue and FeatureFalse

```jsx
<FeatureFlag flagKey="integration-test" appFlags={applicationKeys}>
  <FeatureTrue>
    <p>If feature flag is true, then is content will render.</p>
  </FeatureTrue>
  <FeatureFalse>
    <p>If feature flag is false, then is content will render.</p>
  </FeatureFalse>
</FeatureFlag>
```

### Another Use Case

```js
const applicationKeys = {
  'multivariate-test': 'multivariate-test-2',
  'integration-test': true
};
```

```jsx
<FeatureFlag flagKey="false-test" appFlags={applicationKeys}>
  <p>This non-component should get rendered</p>
  This is also should get rendered.
  <FeatureTrue>This one should throw a warning and wont be rendred</FeatureTrue>
  <FeatureFalse>
    this one should throw a warning and wont be rendred
  </FeatureFalse>
  <FeatureSwitch>
    <FeatureCase condition="multivariate-test-1" allowBreak>
      <p>This one should throw an error and wont be rendred</p>
    </FeatureCase>
  </FeatureSwitch>
</FeatureFlag>
```

### Nested FeatureFlag

```js
const applicationKeys = {
  'multivariate-test': 'multivariate-test-2',
  'integration-test': true
};
```

```jsx
<FeatureFlag flagKey="multivariate-test" appFlags={applicationKeys}>
  <p>This non-component will get rendered</p>
  <FeatureFlag flagKey="multivariate-test" appFlags={flags}>
    <FeatureSwitch>
      <FeatureCase condition="multivariate-test-1" allowBreak>
        <p>Multivariate Test 1 Rendered</p>
      </FeatureCase>
      <FeatureCase condition="multivariate-test-2" allowBreak>
        <p>This one will get rendered(Multivariate Test 2 Rendered)</p>
      </FeatureCase>
      <FeatureCase condition="multivariate-test-3" allowBreak>
        <p>Multivariate Test 3 Rendered</p>
      </FeatureCase>
      <FeatureDefault allowBreak>
        <p>This is the default content if no other cases are matched.</p>
      </FeatureDefault>
    </FeatureSwitch>
  </FeatureFlag>
</FeatureFlag>
```

## Using the React Hooks

```jsx
const appFlags = {
  a: 'a',
  b: 'b',
  c: 'c',
  d: 'd',
  e: 'e'
};

const UsingHooks = () => {
  const [count, setCount] = useState(65);
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Add count</button>
      <FeatureFlag
        flagKey={String.fromCharCode(count).toLowerCase()}
        appFlags={appFlags}
      >
        <FeatureSwitch>
          <FeatureCase condition="a" allowBreak>
            A is being rendered
          </FeatureCase>
          <FeatureCase condition="b" allowBreak>
            B is being rendered
          </FeatureCase>
          <FeatureCase condition="c" allowBreak>
            C is being rendered
          </FeatureCase>
          <FeatureCase condition="d" allowBreak>
            D is being rendered
          </FeatureCase>
          <FeatureCase condition="e" allowBreak>
            E is being rendered
          </FeatureCase>
          <FeatureDefault>No value matches, this is default</FeatureDefault>
        </FeatureSwitch>
      </FeatureFlag>
    </div>
  );
};
```

## Using the API

### Importing

```js
import launchDarklyClient from 'ld-react-components/API';

const endpoints = {
  baseUrl: 'https://app.launchdarkly.com',
  eventsUrl: 'https://events.launchdarkly.com',
  streamUrl: 'https://stream.launchdarkly.com',
  baseTimeout: 100
};
this._ldclientPromise = launchDarklyClient.initWithPromise(user, this._sdkKey, endpoints, 500);

getFeatureFlag(featureId, defaultValue = false) {
  if (typeof window !== 'undefined') {
    return new Promise((resolve, reject) => {
      this._ldclientPromise
      .then((client) => {
        resolve(client.getFeatureFlag(featureId, defaultValue));
      })
      .catch((error) => {
        reject(error);
      });
    });
  }
}
```

## For development

### For the API

#### Testing

```shell
yarn
yarn test
```

### For React

The module includes a demo demonstrating how to use the components

```shell
yarn
yarn dev
```

To see the demo go to http://localhost:8080
