/** @type { import('@storybook/nextjs').StorybookConfig } */
const config = {
    stories: [
        // '../stories/**/*.mdx',
        // '../stories/**/*.stories.@(js|jsx|ts|tsx)',
        '../../../packages/app/**/*.stories.@(js|jsx|ts|tsx)'
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        {
            name: '@storybook/addon-react-native-web',
            options: {
                modulesToTranspile: [
                    'solito',
                    'react-native-web',
                    'expo-linking',
                    'expo-constants',
                    'expo-modules-core',
                    'expo-document-picker',
                    'expo-av',
                    'expo-asset',
                    'tamagui',
                    'tamagui-phosphor-icons',
                    '@tamagui-extras/core'
                ],

                babelPlugins: [
                    // "react-native-reanimated/plugin", // this breaks...
                ],
            },
        }
    ],
    framework: {
        name: '@storybook/nextjs',
        options: {},
    },
    env: (config) => ({
        ...config,
        TAMAGUI_TARGET: 'web',
    }),
    docs: {
        autodocs: 'tag',
    },
}
export default config
