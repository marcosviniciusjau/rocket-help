import { useState } from "react";
import { Alert } from "react-native";
import auth from "@react-native-firebase/auth";
import { VStack, Heading, Icon, useTheme, View } from "native-base";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";

import Logo from "../../assets/logo_primary.svg";

import { Input } from "../../components/Input";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Button } from "../../components/Button";

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSignIn() {
    if(!email || !password) {
      return Alert.alert('Entrar', 'Preencha todos os campos');
    }

    setIsLoading(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);

        if(error.code === 'auth/invalid-email') {
          return Alert.alert('Entrar', 'E-mail inválido');
        }

        if(error.code === 'auth/wrong-password') {
          return Alert.alert('Entrar', 'E-mail ou senha inválida');
        }

        if(error.code === 'auth/user-not-found'){
          return Alert.alert('Entrar', 'E-mail ou senha inválida');
        }

        return Alert.alert('Entrar', 'Ocorreu um erro ao tentar entrar');
      })
  }

  const { colors } = useTheme();
  return (
    <VStack flex={1} alignItems={"center"} bg="gray.600" px={8} pt={24}>
      <Logo />

      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Acesse sua conta
      </Heading>

      <Input
        placeholder="Email"
        mb={4}
        InputLeftElement={
          <View ml={4}>
            <Icon
              as={
                <FontAwesomeIcon color={colors.gray[300]} icon={faEnvelope} />
              }
            />
          </View>
        }
        onChangeText={setEmail}
      />

      <Input
        mb={8}
        placeholder="Senha"
        InputLeftElement={
          <View ml={4}>
            <Icon
              as={<FontAwesomeIcon color={colors.gray[300]} icon={faKey} />}
            />
          </View>
        }
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button 
       title="Entrar"
       w="full"
       onPress={handleSignIn}
       isLoading={isLoading} 
      />
    </VStack>
  );
}
