/** @type {import('next').NextConfig} */
const {withTamagui} = require('@tamagui/next-plugin')
const {join} = require('path')

const boolVals = {
    true: true,
    false: false,
}

const disableExtraction =
    boolVals[process.env.DISABLE_EXTRACTION] ?? process.env.NODE_ENV === 'development'


const plugins = [
    withTamagui({
        config: './tamagui.config.ts',
        components: ['tamagui', '@my/ui', '@tamagui-extras/core'],
        importsWhitelist: ['constants.js', 'colors.js'],
        logTimings: true,
        disableExtraction,
        // experiment - reduced bundle size react-native-web
        useReactNativeWebLite: false,
        shouldExtract: (path) => {
            if (path.includes(join('packages', 'app'))) {
                return true
            }
        },
        excludeReactNativeWebExports: ['Switch', 'ProgressBar', 'Picker', 'CheckBox', 'Touchable'],
    }),
]

module.exports = function () {
    /** @type {import('next').NextConfig} */
    let config = {
        typescript: {
            ignoreBuildErrors: true,
        },
        modularizeImports: {
            '@tamagui/lucide-icons': {
                transform: `@tamagui/lucide-icons/dist/esm/icons/{{kebabCase member}}`,
                skipDefaultConversion: true,
            },
            'tamagui-phosphor-icons': {
                transform: 'tamagui-phosphor-icons/dist/jsx/icons/icons/{{member}}',
                skipDefaultConversion: true,
            },
        },
        transpilePackages: [
            'solito',
            'react-native-web',
            'expo-linking',
            'expo-constants',
            'expo-modules-core',
            'tamagui-phosphor-icons',
        ],
        experimental: {
            // optimizeCss: true,
            scrollRestoration: true,
            legacyBrowsers: false,
        },
    }

    for (const plugin of plugins) {
        config = {
            ...config,
            ...plugin(config),
        }
    }

    return config
}
