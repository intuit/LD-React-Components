import React from 'react';

/**
 * FeatureSwitch
 */
function FeatureSwitch(props) {
  const { children, flagKey, appFlags } = props;

  const childArray = [];

  let breakIt = false;

  React.Children.forEach(children, element => {
    // if the Component is FeatureCase and break is false, compare the feature flag and render the element if its true
    if (
      React.isValidElement(element) &&
      (element.type.displayName === 'FeatureCase' ||
        element.type.name === 'FeatureCase') &&
      !breakIt
    ) {
      const { condition, allowBreak } = element.props;
      if ((appFlags[flagKey] && appFlags[flagKey].value) === condition) {
        childArray.push(element);
        breakIt = allowBreak;
      }
    }
    // if its Default and it is not breaked yet, render the element.
    if (
      React.isValidElement(element) &&
      (element.type.displayName === 'FeatureDefault' ||
        element.type.name === 'FeatureDefault') &&
      !breakIt
    ) {
      childArray.push(element);
    }
  });
  return React.Children.map(childArray, (child, i) => child);
}

export default FeatureSwitch;
