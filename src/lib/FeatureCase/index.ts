import React from 'react';
/**
 * FeatureCase
 */
function FeatureCase(props) {
  const { children } = props;
  return React.Children.map(children, child => child);
}

export default FeatureCase;
