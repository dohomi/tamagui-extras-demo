import {
  CustomToast,
  TamaguiProvider,
  TamaguiProviderProps,
  ToastProvider,
  ToastViewport,
} from '@my/ui'
import config from '../tamagui.config'
import { NavigationProvider } from './navigation'
import { useColorScheme } from 'react-native'

export function Provider({ children, ...rest }: Omit<TamaguiProviderProps, 'config'>) {
  const scheme = useColorScheme()
  return (
    <TamaguiProvider
      config={config}
      disableInjectCSS={!process.env.STORYBOOK}
      defaultTheme={scheme === 'dark' ? 'dark' : 'light'}
      {...rest}
    >
      <ToastProvider swipeDirection="horizontal" native="mobile">
        <NavigationProvider>{children}</NavigationProvider>

        <CustomToast />
        <ToastViewport left={0} right={0} top={2} />
      </ToastProvider>
    </TamaguiProvider>
  )
}
