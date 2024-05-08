import { useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import { VStack,Box } from "native-base";
import { Header } from "../../components/Header/Header";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
export function Register() {
    const [isLoading, setIsLoading]= useState(false);
    const [patrimony,setPatrimony] = useState('');
    const [description,setDescription] = useState('');

    const navigation = useNavigation();

    function handleNewOrder() {
    if(!patrimony || !description) {
        return Alert.alert('Registrar', 'Preencha todos os campos');
    }
    
    setIsLoading(true);

    firestore()
    .collection('orders')
    .add({
        patrimony,
        description,
        status: 'open',
        created_at: firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        Alert.alert('Solicitação', 'Solicitação registrada com sucesso');
        navigation.goBack()
    })
    .catch((error) => {
        console.log(error)
        setIsLoading(false)
        return Alert.alert('Solicitação', 'Não foi possível registrar a solicitação');
    })
}

    return (
        <VStack flex={1} bg="gray.700">
             <Header title="Solicitação"/>
             
           <Input
              placeholder="Número do patrimônio"
              mt={4}
              onChangeText={setPatrimony}
              />

            <Input
                placeholder="Descrição do problema"
                flex={1}
                mt={4}
                multiline
                textAlignVertical="top"
                onChangeText={setDescription}
            />

            <Button
                title="Cadastrar"
                mt={5}
                isLoading={isLoading}
                onPress={handleNewOrder}
            />
        </VStack>
    );
}