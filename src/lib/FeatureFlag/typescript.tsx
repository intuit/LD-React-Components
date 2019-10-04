import * as React from 'react';

/**
 * FeatureFlag Props
 */
type FeatureFlagProps = {
  children?: React.ReactNode;
  flagKey: string;
  appFlags: object;
}

/**
 * FeatureFlag
 */
function FeatureFlag({ children, flagKey, appFlags }: FeatureFlagProps) {
    function elementMatchPluginName(element: any, name: string) {
      return (element.type.displayName === name || element.type.name === name)
    }
    // isChildPluginComponent is true if the child is one of
    // [ FeatureFlag, FeatureTrue, FeatureSwitch, FeatureFalse, FeatureDefault]
    let isChildPluginComponent = false;
    // isNonPluginComponent is true if the child is not a component from this plugin.
    let isNonPluginComponent = false;
    // childArray to render
    const childArray: React.ReactNode[] = [];
    React.Children.forEach(children, element => {
      if (
        React.isValidElement(element) && elementMatchPluginName(element, 'FeatureTrue')
      ) {
        if (isNonPluginComponent) {
          // telling the developer to not use NonPlugin components under FeatureFlag.
          // eslint-disable-next-line no-console
          console.warn(
            'Dont Use <FeatureTrue /> among other elements/components under <FeatureFlag /> only use it with <FeatureFalse />, No mix allowed'
          );
          return;
        }
        // if the appFlags has the flagKey, render the child
        if (appFlags[flagKey] && appFlags[flagKey].value) {
          childArray.push(element);
        }
        isChildPluginComponent = true;
      }
  
      if (
        React.isValidElement(element) && elementMatchPluginName(element, 'FeatureFalse')
      ) {
        if (isNonPluginComponent) {
          // eslint-disable-next-line no-console
          console.warn(
            'Dont Use <FeatureFalse /> among other elements/components under <FeatureFlag /> only use it with <FeatureTrue />, No mix allowed'
          );
          return;
        }
        if (!appFlags[flagKey] || (appFlags[flagKey] && !appFlags[flagKey].value)) {
          childArray.push(element);
        }
        isChildPluginComponent = true;
      }
      // }
  
      if (
        React.isValidElement(element) && elementMatchPluginName(element, 'FeatureSwitch')
      ) {
        if (isNonPluginComponent) {
          // eslint-disable-next-line no-console
          console.warn(
            'Dont Use <FeatureSwitch /> unless its the immediate children of <FeatureFlag />, No mix allowed'
          );
          return;
        }
        childArray.push(
          React.cloneElement(element,{
            flagKey,
            appFlags
          })
        );
        isChildPluginComponent = true;
      }
      // if the component is neither of the above components it must be NonPlugin Component,
      // therefore, we simply render it as its under FeatureTrue
      if (!isChildPluginComponent) {
        isNonPluginComponent = true;
        if (appFlags[flagKey] && appFlags[flagKey].value) {
          childArray.push(element);
        }
      }
    });
  
    return React.Children.map(childArray, child => child);
  }
  
  export default FeatureFlag;