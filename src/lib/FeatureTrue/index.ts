import React, { ReactNode } from 'react';
/**
 * FeatureTrue
 */

type FeatureTrueProps = {
  children: ReactNode 
}

const FeatureTrue = ({ children }: FeatureTrueProps) => React.Children.map(children, (child: ReactNode) => child);

export default FeatureTrue;
