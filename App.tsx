<<<<<<< HEAD
import { NativeBaseProvider, StatusBar } from 'native-base';
import {useFonts, Roboto_400Regular, Roboto_700Bold} from '@expo-google-fonts/roboto'

import {THEME} from './src/styles/theme';

import { SignIn } from './src/screens/SignIn';
import { Loading } from './src/components/Loading';

export default function App() {
  const [fontsLoaded] = useFonts({Roboto_400Regular, Roboto_700Bold});

=======
import { NativeBaseProvider, StatusBar } from "native-base";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { THEME } from "./src/styles/theme";

import { Loading } from "./src/components/Loading";
import { Routes } from "./src/routes";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });
>>>>>>> aac4a397acfa2152b1890a79f49c57addc638dc1

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
<<<<<<< HEAD
      
      { fontsLoaded ? <SignIn/> : <Loading/> }
    </NativeBaseProvider>
  );
}
=======

      {fontsLoaded ? <Routes /> : <Loading />}
    </NativeBaseProvider>
  );
}
>>>>>>> aac4a397acfa2152b1890a79f49c57addc638dc1
