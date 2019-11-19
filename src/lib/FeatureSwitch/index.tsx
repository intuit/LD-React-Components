import React from 'react';
import FeatureCase from '../FeatureCase';
import FeatureDefault from '../FeatureDefault';

interface IAppFlag {
  value: any,
  version: number,
  variation: number,
  trackEvents: boolean
}

interface IComponentProps {
  flagKey: string;
  appFlags: {
    [x: string]: IAppFlag;
  };
}

/**
 * FeatureSwitch
 */
const FeatureSwitch: React.FC<IComponentProps> = (props) => {
  const { children, flagKey, appFlags } = props;

  const childArray: React.ReactNode[] = [];

  let breakIt = false;

  React.Children.forEach(children, element => {
    // if the Component is FeatureCase and break is false, compare the feature flag and render the element if its true
    if (React.isValidElement(element) && (element as any).type === FeatureCase && !breakIt) {
      // TODO use proper type cast here once they are defined
      const { condition, allowBreak } = (element as any).props;
      if (appFlags[flagKey] === condition) {
        childArray.push(element);
        breakIt = allowBreak;
      }
    }
    // if its Default and it is not breaked yet, render the element.
    if (React.isValidElement(element) && (element as any).type === FeatureDefault && !breakIt) {
      childArray.push(element);
    }
  });

  return <React.Fragment>{childArray}</React.Fragment>;
};

export default FeatureSwitch;
