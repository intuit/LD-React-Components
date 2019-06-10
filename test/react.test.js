/* eslint-disable indent */
import React from 'react';
import { expect } from 'chai';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { FeatureTrue, FeatureFlag, FeatureFalse, FeatureSwitch, FeatureCase, FeatureDefault } from '../src/lib/index';
Enzyme.configure({ adapter: new Adapter() });



const appFlags = {
  'a': true,
  'b': true,
  'switcher': 'switch'
};




describe('Launch Darkly Plugin ', () => {
  it('FeatureFlag: should render component with FeatureTrue ', () => {
    const component = shallow(
      <FeatureFlag appFlags={appFlags} flagKey="a">
        <div>hello</div>
        <FeatureTrue><div>Hello there</div></FeatureTrue>

      </FeatureFlag>
    );
    expect(component.exists()).to.equal(true);
  });

  it('FeatureFlag: should render component with FeatureTrue where flagKey doesnt much', () => {
    const component = shallow(
      <FeatureFlag appFlags={appFlags} flagKey="asdf">
        <div>hello</div>
        <FeatureTrue><div>Hello there</div></FeatureTrue>

      </FeatureFlag>
    );
    expect(component.exists()).to.equal(false);
  });

  it('FeatureFlag: should render component with FeatureTrue and NonPluginElement should throw error', () => {
    const component = mount(
      <FeatureFlag appFlags={appFlags} flagKey="a">
        <FeatureTrue><div>Hello there</div></FeatureTrue>
        <div>Non Plugin Element</div>
        <FeatureTrue><div>Hello there</div></FeatureTrue>
      </FeatureFlag>
    );
    expect(component.exists()).to.equal(true);
  });

  it('FeatureFlag: should render component with FeatureFalse ', () => {
    const component = shallow(
      <FeatureFlag appFlags={appFlags} flagKey="a">
        <div>hello</div>
        <FeatureFalse><div>Hello there</div></FeatureFalse>

      </FeatureFlag>
    );
    expect(component.exists()).to.equal(true);
  });
  it('FeatureFlag: should render component with FeatureFalse and NonPluginElement should throw error', () => {
    const component = mount(
      <FeatureFlag appFlags={appFlags} flagKey="c">
        <FeatureFalse><div>Hello there</div></FeatureFalse>
        <div>Non Plugin Element</div>
        <FeatureFalse><div>Hello there</div></FeatureFalse>
      </FeatureFlag>
    );
    expect(component.exists()).to.equal(true);
  });

  it('FeatureSwitch: should render component ', () => {
    const component = mount(
      <FeatureFlag appFlags={appFlags} flagKey="switcher">
        <FeatureSwitch>
            <FeatureCase condition="switch" allowBreak><p>Multivariate Test 1 Rendered</p></FeatureCase>
            <FeatureCase condition="a" allowBreak><p>Multivariate Test 2 Rendered</p></FeatureCase>
            <FeatureDefault><p>If no conditions are met then render the default</p></FeatureDefault>
        </FeatureSwitch>
      </FeatureFlag>
    );
    expect(component.exists()).to.equal(true);
  });

  it('FeatureSwitch: should render component throws warning for mixed', () => {
    const component = mount(
      <FeatureFlag appFlags={appFlags} flagKey="switcher">
        <div>Hello</div>
        <FeatureSwitch>
            <FeatureCase condition="switch" allowBreak><p>Multivariate Test 1 Rendered</p></FeatureCase>
            <FeatureCase condition="a" allowBreak><p>Multivariate Test 2 Rendered</p></FeatureCase>
            <FeatureDefault><p>If no conditions are met then render the default</p></FeatureDefault>
        </FeatureSwitch>
      </FeatureFlag>
    );
    expect(component.exists()).to.equal(true);
  });

  it('FeatureSwitch: should render component throws warning for mixed', () => {
    const component = mount(
      <FeatureFlag appFlags={appFlags} flagKey="switcher">
        <FeatureSwitch>
            <FeatureCase condition="swch" allowBreak><p>Multivariate Test 1 Rendered</p></FeatureCase>
            <FeatureCase condition="a" allowBreak><p>Multivariate Test 2 Rendered</p></FeatureCase>
            <FeatureDefault><p>If no conditions are met then render the default</p></FeatureDefault>
        </FeatureSwitch>
      </FeatureFlag>
    );
    expect(component.exists()).to.equal(true);
  });
});
