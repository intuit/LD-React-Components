<div align="center">
  <img width="267" height="136"
    src="./ld-react-components.png">
  <h1>LD React Components</h1>
  <p>Semantic component helpers to support LaunchDarkly in your react app.</p>
</div>
[![CircleCI](https://circleci.com/gh/intuit/LD-React-Components/tree/master.svg?style=svg)](https://circleci.com/gh/intuit/LD-React-Components/tree/master)

## Usage

Install node module

You can use `npm` or `yarn` however it is advised to choose one and stick with it. For the purposes of documentation `yarn` is being used.

```shell
yarn add ld-react-components
```

### Importing the components

```js
import { FeatureFlag, FeatureSwitch, FeatureCase, FeatureTrue, FeatureFalse } from 'ld-react-components';
```

#### API initialization 
```js
this._ldclientPromise = launchDarklyClient.initWithPromise(user, this._sdkKey, 500);

const endpoints = {
  baseUrl: 'https://app.launchdarkly.com',
  eventsUrl: 'https://events.launchdarkly.com',
  streamUrl: 'https://stream.launchdarkly.com',
  baseTimeout: 100
};

this._ldclientPromise = launchDarklyClient.initWithPromise(user, this._sdkKey,endpoints, 500);
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

`FeatureSwitch` should be a child of ``FeatureFlag`` and can take ``FeatureCase`` and ``FeatureDefault`` as children.

``FeatureCase`` component takes `condition` and `allowBreak`(a boolean) as props, 
`condition` is the `case` feature, while `allowBreak` used as a `break`. The reason for name change is `case` and `break` are reserved words on JS.

```jsx
<FeatureFlag flagKey="multivariate-test" appFlags={applicationKeys}>
  <FeatureSwitch>
    <FeatureCase condition="multivariate-test-1" allowBreak><p>Multivariate Test 1 Rendered</p></FeatureCase>
    <FeatureCase condition="multivariate-test-2" allowBreak><p>Multivariate Test 2 Rendered</p></FeatureCase>
    <FeatureCase condition="multivariate-test-3" allowBreak><p>Multivariate Test 3 Rendered</p></FeatureCase>
    <FeatureCase condition="multivariate-test-4" allowBreak><p>Multivariate Test 4 Rendered</p></FeatureCase>
    <FeatureDefault><p>If no conditions are met then render the default</p></FeatureDefault>
  </FeatureSwitch>
</FeatureFlag>
```

### FeatureTrue and FeatureFalse

```jsx
<FeatureFlag flagKey="integration-test" appFlags={applicationKeys}>
  <FeatureTrue><p>If feature flag is true, then is content will render.</p></FeatureTrue>
  <FeatureFalse><p>If feature flag is false, then is content will render.</p></FeatureFalse>
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
  <FeatureFalse>this one should throw a warning and wont be rendred</FeatureFalse>
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
      <FeatureFlag flagKey={String.fromCharCode(count).toLowerCase()} appFlags={appFlags} >
        <FeatureSwitch>
          <FeatureCase condition="a" allowBreak>A is being rendered</FeatureCase>
          <FeatureCase condition="b" allowBreak>B is being rendered</FeatureCase>
          <FeatureCase condition="c" allowBreak>C is being rendered</FeatureCase>
          <FeatureCase condition="d" allowBreak>D is being rendered</FeatureCase>
          <FeatureCase condition="e" allowBreak>E is being rendered</FeatureCase>
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
yarn test:jest
```

### For React

The module includes a demo demonstrating how to use the components

```shell
yarn
yarn dev
```

To see the demo go to http://localhost:8080
