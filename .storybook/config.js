import { addDecorator } from '@storybook/react';
import { configure, addParameters } from '@storybook/react';
import "core-js/stable";
import "regenerator-runtime/runtime";
import { withA11y } from '@storybook/addon-a11y';

// automatically import all files ending in *.stories.js
configure(require.context('../src', true, /stories\.(js|jsx|mdx)?$/), module);

addDecorator(withA11y);

addParameters({
  options: {
    panelPosition: 'bottom',
    name: 'Launch Darkly React Components',
  },
  backgrounds: [
    {name: 'white', value: "#fff", default: true},
    {name: 'grey', value: "#f4f5f8"}
  ],
  a11y: {
    // ... axe options
    element: '#root', // optional selector which element to inspect
    config: {}, // axe-core configurationOptions (https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#parameters-1)
    options: {} // axe-core optionsParameter (https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#options-parameter)
  },
});
