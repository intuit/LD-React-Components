<div align="center">
  <img width="267" height="136"
    src="./ld-react-components.png">
  <h1>LD React Components</h1>
  <p>Semantic component helpers to support LaunchDarkly in your react app.</p>
</div>

<div align="center"><a href="https://circleci.com/gh/intuit/LD-React-Components"><img src="https://img.shields.io/circleci/project/github/intuit/LD-React-Components/master.svg?style=flat-square&logo=circleci" alt="CircleCI" /></a> <a href="https://codecov.io/gh/intuit/LD-React-Components"><img src="https://codecov.io/gh/intuit/LD-React-Components/branch/master/graph/badge.svg?token=L6URIkiDin" /></a> <a href="#contributors"><img src="https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square&logo=github" alt="All Contributors" /></a> <a href="https://www.npmjs.com/package/ld-react-components"><img src="https://img.shields.io/npm/v/ld-react-components.svg?style=flat-square&logo=npm" alt="npm" /></a> <a href="https://www.npmjs.com/package/ld-react-components"><img src="https://img.shields.io/npm/dt/ld-react-components.svg?style=flat-square&logo=npm" alt="npm" /></a> <a href="https://app.snyk.io/org/poorpaddy/project/c1415dab-3e6f-4438-8e73-26a3e5ce9f55"><img src="https://img.shields.io/snyk/vulnerabilities/github/intuit/LD-React-Components/package.json.svg?style=flat-square&logo=snyk&logoColor=lightgrey" alt="" /></a> <a href="https://app.fossa.com/projects/git%2Bgithub.com%2Fintuit%2FLD-React-Components?ref=badge_shield" alt="FOSSA Status"><img src="https://app.fossa.com/api/projects/git%2Bgithub.com%2Fintuit%2FLD-React-Components.svg?type=shield"/></a> <a href="https://github.com/intuit/LD-React-Components"><img src="https://img.shields.io/badge/release-auto.svg?style=flat-square&colorA=888888&amp;colorB=9B065A&amp;label=auto&amp;logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAACzElEQVR4AYXBW2iVBQAA4O+/nLlLO9NM7JSXasko2ASZMaKyhRKEDH2ohxHVWy6EiIiiLOgiZG9CtdgG0VNQoJEXRogVgZYylI1skiKVITPTTtnv3M7+v8UvnG3M+r7APLIRxStn69qzqeBBrMYyBDiL4SD0VeFmRwtrkrI5IjP0F7rjzrSjvbTqwubiLZffySrhRrSghBJa8EBYY0NyLJt8bDBOtzbEY72TldQ1kRm6otana8JK3/kzN/3V/NBPU6HsNnNlZAz/ukOalb0RBJKeQnykd7LiX5Fp/YXuQlfUuhXbg8Di5GL9jbXFq/tLa86PpxPhAPrwCYaiorS8L/uuPJh1hZFbcR8mewrx0d7JShr3F7pNW4vX0GRakKWVk7taDq7uPvFWw8YkMcPVb+vfvfRZ1i7zqFwjtmFouL72y6C/0L0Ie3GvaQXRyYVB3YZNE32/+A/D9bVLcRB3yw3hkRCdaDUtFl6Ykr20aaLvKoqIXUdbMj6GFzAmdxfWx9iIRrkDr1f27cFONGMUo/gRI/jNbIMYxJOoR1cY0OGaVPb5z9mlKbyJP/EsdmIXvsFmM7Ql42nEblX3xI1BbYbTkXCqRnxUbgzPo4T7sQBNeBG7zbAiDI8nWfZDhQWYCG4PFr+HMBQ6l5VPJybeRyJXwsdYJ/cRnlJV0yB4ZlUYtFQIkMZnst8fRrPcKezHCblz2IInMIkPzbbyb9mW42nWInc2xmE0y61AJ06oGsXL5rcOK1UdCbEXiVwNXsEy/6+EbaiVG8eeEAfxvaoSBnCH61uOD7BS1Ul8ESHBKWxCrdyd6EYNKihgEVrwOAbQruoytuBYIFfAc3gVN6iawhjKyNCEpYhVJXgbOzARyaU4hCtYizq5EI1YgiUoIlT1B7ZjByqmRWYbwtdYjoWoN7+LOIQefIqKawLzK6ID69GGpQgwhhEcwGGUzfEPAiPqsCXadFsAAAAASUVORK5CYII=" alt="Auto Release" /></a> <a href="https://intuit.github.io/LD-React-Components/"><img src="https://img.shields.io/badge/example-demo-blue.svg?style=flat-square&logo=github" alt="npm" /></a></div>


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
  'integration-test': { value: true, version: 3 },
  'multivariate-test': { value: 'multivariate-test-1', version: 5 }
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
  'multivariate-test': { value: 'multivariate-test-2', version: 1},
  'integration-test': { value: true }
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
  'multivariate-test': { value: 'multivariate-test-2' },
  'integration-test': { value: true }
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
  a: { value: 'a' },
  b: { value: 'b' },
  c: { value: 'c' },
  d: { value: 'd' },
  e: { value: 'e' }
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

## Contributors ✨

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://www.cmscode.com"><img src="https://avatars3.githubusercontent.com/u/2213076?v=4" width="100px;" alt="Dave Bergschneider"/><br /><sub><b>Dave Bergschneider</b></sub></a><br /><a href="https://github.com/intuit/LD-React-Components/commits?author=poorpaddy" title="Code">💻</a> <a href="#design-poorpaddy" title="Design">🎨</a> <a href="https://github.com/intuit/LD-React-Components/commits?author=poorpaddy" title="Documentation">📖</a> <a href="#example-poorpaddy" title="Examples">💡</a> <a href="#maintenance-poorpaddy" title="Maintenance">🚧</a></td>
    <td align="center"><a href="http://hipstersmoothie.com"><img src="https://avatars3.githubusercontent.com/u/1192452?v=4" width="100px;" alt="Andrew Lisowski"/><br /><sub><b>Andrew Lisowski</b></sub></a><br /><a href="#infra-hipstersmoothie" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    <td align="center"><a href="http://www.harshitjain.in"><img src="https://avatars2.githubusercontent.com/u/1290501?v=4" width="100px;" alt="Harshit Jain"/><br /><sub><b>Harshit Jain</b></sub></a><br /><a href="https://github.com/intuit/LD-React-Components/commits?author=hjaintech" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/zjael"><img src="https://avatars3.githubusercontent.com/u/13909277?s=460&v=4" width="100px;" alt="Jakob S"/><br /><sub><b>Jakob S</b></sub></a><br /> <a href="#maintenance-zjael" title="Maintenance">🚧</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->
Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!




### Adding a Contributor

To add a contributor run `yarn all-contributors add <username> <contribution>`.<br><br>
Example: `yarn all-contributors add poorpaddy code,doc`

## License

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fintuit%2FLD-React-Components.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fintuit%2FLD-React-Components?ref=badge_large)