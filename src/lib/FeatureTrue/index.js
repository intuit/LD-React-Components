import React from 'react';
/**
 * FeatureFalse
 */
function FeatureTrue(props) {
  const { children } = props;
  return React.Children.map(children, child => child);
}

export default FeatureTrue;
