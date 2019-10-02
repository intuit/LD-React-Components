import React from 'react';
import ReactDOM from 'react-dom';
/* eslint-disable-next-line */
import { AppContainer } from 'react-hot-loader';
import FeatureFlag from '../lib/FeatureFlag/index';
import FeatureTrue from '../lib/FeatureTrue/index';
import FeatureFalse from '../lib/FeatureFalse/index';
import FeatureSwitch from '../lib/FeatureSwitch/index';
import FeatureCase from '../lib/FeatureCase/index';
import FeatureDefault from '../lib/FeatureDefault/index';
import UsingHooks from './usingHooks';

function Demo() {
  // const applicableFlags = {
  //   'integration-test': 'tup'
  // };
  const flags = {
    'multivariate-test': 'multivariate-test-2',
    'integration-test': true,
  };
  return (
    <div>
      <h1>Live Demo with examples</h1>
      <h3>
        Testing <code>FeatureFlag</code> with <code>FeatureSwitch</code> and
        <code>FeatureCase</code>
      </h3>
      <pre>
        {`
  const flags = {
    'multivariate-test': 'multivariate-test-2',
    'integration-test': true
  };
  <FeatureFlag flagKey="multivariate-test" appFlags={flags}>
    <FeatureSwitch>
      <FeatureCase condition="multivariate-test-1" allowBreak>
        <p>content a</p>
      </FeatureCase>
      <FeatureCase condition="multivariate-test-2" allowBreak>
        <p>content b</p>
      </FeatureCase>
      <FeatureCase condition="multivariate-test-3" allowBreak>
        <p>content d</p>
      </FeatureCase>
      <FeatureDefault allowBreak>
        <p>This is the default content if no other cases are matched.</p>
      </FeatureDefault>
    </FeatureSwitch>
  </FeatureFlag>
        `}
      </pre>
      <FeatureFlag flagKey="multivariate-test" appFlags={flags}>
        <FeatureSwitch>
          <FeatureCase condition="multivariate-test-1" allowBreak>
            <p>Output: multivariate-test-1</p>
          </FeatureCase>
          <FeatureCase condition="multivariate-test-2" allowBreak>
            <p>Output: multivariate-test-2</p>
          </FeatureCase>
          <FeatureCase condition="multivariate-test-3" allowBreak>
            <p>Output: multivariate-test-3</p>
          </FeatureCase>
          <FeatureDefault allowBreak>
            <p>
              Output: This is the default content if no other cases are matched.
            </p>
          </FeatureDefault>
        </FeatureSwitch>
      </FeatureFlag>

      <h3>
        Testing <code>FeatureFlag</code> with <code>FeatureTrue</code> and
        <code>FeatureFalse</code>
      </h3>
      <pre>
        {`
  <FeatureFlag flagKey="integration-test" appFlags={flags}>
    <FeatureTrue>Output: FeatureTrue being rendered</FeatureTrue>
    <FeatureFalse>Output: FeatureFalse being rendered</FeatureFalse>
  </FeatureFlag>
        `}
      </pre>

      <FeatureFlag flagKey="integration-test" appFlags={flags}>
        <FeatureTrue>Output: FeatureTrue being rendered</FeatureTrue>
        <FeatureFalse>Output: FeatureFalse being rendered</FeatureFalse>
      </FeatureFlag>

      <h3>
        Testing <code>FeatureFlag</code> with mixed components including Non
        Plugin Components, <code>FeatureTrue</code>, <code>FeatureFalse</code>
        and <code>FeatureSwtich</code>
      </h3>
      <pre>
        {`
<FeatureFlag flagKey="integration-test" appFlags={flags}>
  <p>This non-component should get rendered</p>
  This is also should get rendered.
  <FeatureTrue>But this one should throw a warning</FeatureTrue>
  <FeatureFalse>this one should throw a warning</FeatureFalse>
  <FeatureSwitch>
    <FeatureCase condition="multivariate-test-1" allowBreak>
      <p>This one should throw an error</p>
    </FeatureCase>
  </FeatureSwitch>

  <FeatureFlag flagKey="multivariate-test" appFlags={flags}>
    <FeatureSwitch>
      <FeatureCase condition="multivariate-test-1" allowBreak>
        <p>content a</p>
      </FeatureCase>
      <FeatureCase condition="multivariate-test-2" allowBreak>
        <p>content b</p>
      </FeatureCase>
      <FeatureCase condition="multivariate-test-3" allowBreak>
        <p>content d</p>
      </FeatureCase>
      <FeatureDefault allowBreak>
        <p>This is the default content if no other cases are matched.</p>
      </FeatureDefault>
    </FeatureSwitch>
  </FeatureFlag>
</FeatureFlag>
        `}
      </pre>

      <FeatureFlag flagKey="integration-test" appFlags={flags}>
        <p>This non-component should get rendered</p>
        This is also should get rendered.
        <FeatureTrue>But this one should throw a warning</FeatureTrue>
        <FeatureFalse>this one should throw a warning</FeatureFalse>
        <FeatureSwitch>
          <FeatureCase condition="multivariate-test-1" allowBreak>
            <p>This one should throw an error</p>
          </FeatureCase>
        </FeatureSwitch>
        <FeatureFlag flagKey="multivariate-test" appFlags={flags}>
          <FeatureSwitch>
            <FeatureCase condition="multivariate-test-1" allowBreak>
              <p>content a</p>
            </FeatureCase>
            <FeatureCase condition="multivariate-test-2" allowBreak>
              <p>content b</p>
            </FeatureCase>
            <FeatureCase condition="multivariate-test-3" allowBreak>
              <p>content d</p>
            </FeatureCase>
            <FeatureDefault allowBreak>
              <p>This is the default content if no other cases are matched.</p>
            </FeatureDefault>
          </FeatureSwitch>
        </FeatureFlag>
      </FeatureFlag>

      <h3>Testing using React Hooks </h3>
      <pre>{`
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
};`}</pre>
      <UsingHooks />
    </div>
  );
}

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(Demo);
// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./index', () => {
    render(Demo);
  });
}
