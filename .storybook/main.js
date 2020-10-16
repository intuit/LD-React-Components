module.exports = {
    stories: ['../src/lib/**/*.stories.@(js|jsx|mdx)'],
    addons: [
        '@storybook/addon-docs',
        '@storybook/addon-knobs/register',
        '@storybook/addon-storysource/register',
        '@storybook/addon-actions/register',
        '@storybook/addon-links/register',
        '@storybook/addon-a11y/register'
    ],
    options: {
        panelPosition: 'bottom',
        name: 'Launch Darkly React Components',
    },
    backgrounds: [
        {
            name: 'white',
            value: '#fff',
            default: true,
        },
        {
            name: 'grey',
            value: '#f4f5f8',
        },
    ],
    a11y: {
        // ... axe options
        element: '#root', // optional selector which element to inspect
        config: {}, // axe-core configurationOptions (https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#parameters-1)
        options: {}, // axe-core optionsParameter (https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#options-parameter)
    },
    presets: [
        '@storybook/preset-create-react-app',
    ],
};
