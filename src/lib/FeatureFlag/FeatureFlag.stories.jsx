import React from 'react';
import FeatureFlag from '.';
import FeatureSwitch from '../FeatureSwitch';
import FeatureCase from '../FeatureCase';
import FeatureDefault from '../FeatureDefault';
import notes from './README.md';

export default {
  title: 'Component|Feature Flag',
  component: FeatureFlag,
  parameters: { notes }
};

const applicationKeys = {
  'integration-test': { value: true, version: 3 },
  'multivariate-test': { value: 'multivariate-test-1', version: 5 }
};

export const basicFeatureFlag = () => (
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
);