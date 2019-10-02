import React from 'react';
/**
 * FeatureDefault
 */
function FeatureDefault(props) {
  const { children } = props;
  return React.Children.map(children, child => child);
}

export default FeatureDefault;
