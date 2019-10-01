import React from 'react';
/**
 * FeatureDefault
 */
function FeatureDefault(props) {
  const { children } = props;
  return React.Children.map(children, (child, i) => child);
}

export default FeatureDefault;
