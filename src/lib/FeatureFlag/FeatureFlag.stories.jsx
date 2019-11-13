import React from 'react';
import { text, object } from '@storybook/addon-knobs';

import FeatureFlag from './typescript.tsx';
import FeatureSwitch from '../FeatureSwitch';
import FeatureCase from '../FeatureCase';
import FeatureDefault from '../FeatureDefault';
import FeatureTrue from '../FeatureTrue';
import FeatureFalse from '../FeatureFalse';

import notes from './README.md';

export default {
  title: 'Component|Feature Flag',
  component: FeatureFlag,
  parameters: { notes }
};

const applicationKeys = {
  'integration-test': true,
  'multivariate-test': 'multivariate-test-1'
};

export const standardUsage = () => (
  <FeatureFlag
    flagKey={text('flagKey', 'multivariate-test')}
    appFlags={object('appFlags', applicationKeys)}
  >
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
);

export const withFeatureTrueAndFeatureFalse = () => (
  <FeatureFlag flagKey="integration-test" appFlags={object('appFlags', applicationKeys)}>
    <FeatureTrue>Output: FeatureTrue being rendered</FeatureTrue>
    <FeatureFalse>Output: FeatureFalse being rendered</FeatureFalse>
  </FeatureFlag>
);

export const withNesting = () => {
  const flags = {
    'nested-flag-key': 'nested-flag-key-1'
  };
  return (
    <FeatureFlag flagKey="multivariate-test" appFlags={applicationKeys}>
      <p>
        A non-component (in this case, a p tag) is being rendered, under the parent FeatureFlag
        component. Check out the story below to see the code.
      </p>
      <FeatureFlag flagKey="nested-flag-key" appFlags={object('appFlags', flags)}>
        <FeatureSwitch>
          <FeatureCase condition="nested-flag-key-1" allowBreak>
            <p>Nested feature 1 Rendered</p>
          </FeatureCase>
          <FeatureCase condition="nested-flag-key-2" allowBreak>
            <p>Nested feature 2 Rendered</p>
          </FeatureCase>
          <FeatureCase condition="nested-flag-key-3" allowBreak>
            <p>Nested feature 3 Rendered</p>
          </FeatureCase>
          <FeatureDefault allowBreak>
            <p>This is the default content if no other cases are matched.</p>
          </FeatureDefault>
        </FeatureSwitch>
      </FeatureFlag>
    </FeatureFlag>
  );
};
