import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {
  FeatureTrue,
  FeatureFlag,
  FeatureFalse,
  FeatureSwitch,
  FeatureCase,
  FeatureDefault
} from '../src/lib/index';

Enzyme.configure({ adapter: new Adapter() });

const appFlags = {
  a: {
    value: true,
    version: 4,
    variation: 0,
    trackEvents: false
  },
  b: {
    value: false,
    version: 5,
    variation: 0,
    trackEvents: false
  },
  switcher: {
    value: 'switch',
    version: 5,
    variation: 0,
    trackEvents: false
  }
};

describe('Launch Darkly Plugin ', () => {
  it.only('FeatureFlag: should render component if flagKey value is true in appFlags object ', () => {
    const component = shallow(
      <FeatureFlag appFlags={appFlags} flagKey="a">
        <div id="hello">hello</div>
      </FeatureFlag>
    );
    expect(component.exists()).toBe(true);
    expect(component.find('#hello').exists()).toBe(true);
    expect(component.debug()).toMatchSnapshot();
  });

  it.only('FeatureFlag: should not render component if flagKey value is false in appFlags object ', () => {
    const component = shallow(
      <FeatureFlag appFlags={appFlags} flagKey="b">
        <div id="hello">hello</div>
      </FeatureFlag>
    );
    expect(component.exists()).toBe(false);
    expect(component.debug()).toMatchSnapshot();
  });

  it.only('FeatureFlag: should not render component if flagKey does not exist in appFlags object ', () => {
    const component = shallow(
      <FeatureFlag appFlags={appFlags} flagKey="c">
        <div id="hello">hello</div>
      </FeatureFlag>
    );
    expect(component.exists()).toBe(false);
    expect(component.debug()).toMatchSnapshot();
  });

  it.only('FeatureFlag: should render only the FeatureTrue when flagKey value is true', () => {
    const component = mount(
      <FeatureFlag appFlags={appFlags} flagKey="a">
        <FeatureTrue>
          <div>Gets rendered when flagKey value is true</div>
        </FeatureTrue>
        <FeatureFalse>
          <div>Gets rendered when flagKey value is false</div>
        </FeatureFalse>
      </FeatureFlag>
    );
    expect(component.exists()).toBe(true);
    expect(component.find('FeatureTrue').exists()).toBe(true);
    expect(component.debug()).toMatchSnapshot();
  });

  it.only('FeatureFlag: should render only the FeatureFalse when flagKey value is false', () => {
    const component = mount(
      <FeatureFlag appFlags={appFlags} flagKey="b">
        <FeatureTrue>
          <div>Gets rendered when flagKey value is true</div>
        </FeatureTrue>
        <FeatureFalse>
          <div>Gets rendered when flagKey value is false</div>
        </FeatureFalse>
      </FeatureFlag>
    );
    expect(component.exists()).toBe(true);
    expect(component.find('FeatureFalse').exists()).toBe(true);
    expect(component.debug()).toMatchSnapshot();
  });

  it.only('FeatureFlag: should not render either FeatureTrue or FeatureFalse when it gets mixed with NonPluginElement and should throw a warnring', () => {
    const component = shallow(
      <FeatureFlag appFlags={appFlags} flagKey="a">
        <div>Non Plugin Element</div>
        <FeatureTrue>
          <div>Hello there</div>
        </FeatureTrue>
      </FeatureFlag>
    );
    expect(component.exists()).toBe(true);
    expect(component.debug()).toMatchSnapshot();
  });

  it.only('FeatureSwitch: renders the FeatureCase component that matches the flagKey ', () => {
    const component = mount(
      <FeatureFlag appFlags={appFlags} flagKey="switcher">
        <FeatureSwitch>
          <FeatureCase condition="switch" allowBreak>
            <p>Multivariate Test 1 Rendered</p>
          </FeatureCase>
          <FeatureCase condition="a" allowBreak>
            <p>Multivariate Test 2 Rendered</p>
          </FeatureCase>
          <FeatureDefault>
            <p>If no conditions are met then render the default</p>
          </FeatureDefault>
        </FeatureSwitch>
      </FeatureFlag>
    );
    expect(component.exists()).toBe(true);
    expect(component.find({ condition: 'switch' }).exists()).toBe(true);
    expect(component.debug()).toMatchSnapshot();
  });

  it.only('FeatureSwitch: renders the FeatureDefault component when the no FeatureCase found that matches the flagKey ', () => {
    const component = mount(
      <FeatureFlag appFlags={appFlags} flagKey="switcher">
        <FeatureSwitch>
          <FeatureCase condition="aa" allowBreak>
            <p>Multivariate Test 1 Rendered</p>
          </FeatureCase>
          <FeatureCase condition="acc" allowBreak>
            <p>Multivariate Test 2 Rendered</p>
          </FeatureCase>
          <FeatureDefault>
            <p>If no conditions are met then render the default</p>
          </FeatureDefault>
        </FeatureSwitch>
      </FeatureFlag>
    );
    expect(component.exists()).toBe(true);
    expect(component.find('FeatureDefault').exists()).toBe(true);
    expect(component.debug()).toMatchSnapshot();
  });

  it.only('FeatureFlag: should not render the FeatureSwitch and throw a warning when FeatureSwitch gets mixed with NonPlugin elements', () => {
    const component = mount(
      <FeatureFlag appFlags={appFlags} flagKey="switcher">
        <div id="hello">Hello</div>
        <FeatureSwitch>
          <FeatureCase condition="switch" allowBreak>
            <p>Multivariate Test 1 Rendered</p>
          </FeatureCase>
          <FeatureCase condition="a" allowBreak>
            <p>Multivariate Test 2 Rendered</p>
          </FeatureCase>
          <FeatureDefault>
            <p>If no conditions are met then render the default</p>
          </FeatureDefault>
        </FeatureSwitch>
      </FeatureFlag>
    );
    expect(component.exists()).toBe(true);
    expect(component.find({ id: 'hello' }).exists()).toBe(true);
    expect(component.debug()).toMatchSnapshot();
  });
});
