import React from 'react';
/**
 * FeatureFalse
 */
function FeatureFalse(props) {
  const { children } = props;
  return React.Children.map(children, child => child);
}

export default FeatureFalse;
