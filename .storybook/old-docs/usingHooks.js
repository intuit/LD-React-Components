import React, { useState } from 'react';
import FeatureFlag from '../lib/FeatureFlag/index';
import FeatureSwitch from '../lib/FeatureSwitch/index';
import FeatureCase from '../lib/FeatureCase/index';
import FeatureDefault from '../lib/FeatureDefault/index';

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

export default UsingHooks;

