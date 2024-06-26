import {useState,useEffect} from 'react';
import { Alert } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { HStack, Heading, IconButton, Text, VStack,useTheme,FlatList, Center } from 'native-base';

import { faChartBar, faMessage, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import { dateFormat } from '../../utils/dateFormat';

import Logo from '../../assets/logo_secondary.svg';

import { Filter } from '../../components/Filter/Filter';
import { Button } from '../../components/Button';
import { Order,OrderProps } from '../../components/Order/Order';

import { Loading } from '../../components/Loading';

export function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>('open');
  const [orders,setOrders]= useState<OrderProps[]>([])

  const navigation = useNavigation();
  const { colors } = useTheme();

  function handleNewOrder() {
    navigation.navigate('new');
  }

  function handleOpenDetails(orderId: string) {
    navigation.navigate('details', { orderId });
  }

  function handleLogout() {
    auth()
      .signOut()
      .catch(error => {
        console.log(error);
        Alert.alert('Sair', 'Não foi possível sair');
      });
  }

  useEffect(() => {
    setIsLoading(true);
    const subscriber = firestore()
      .collection('orders')
      .where('status', '==', statusSelected)
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => {
          const { patrimony, description, status, created_at } = doc.data();
          return {
            id: doc.id,
            patrimony,
            description,
            status,
            when: dateFormat(created_at),
          }
        })
        setOrders(data);
        setIsLoading(false);
      })

    return subscriber
  }, [statusSelected]);

  return (
    <VStack flex={1} bg="gray.600" pb={6}>
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems={"center"}
        bg="gray.700"
        pb={5}
        pt={12}
        px={6}
        >

        <Logo />
        <IconButton
          icon={<FontAwesomeIcon icon={faSignOut} size={24} color={colors.gray[300]}/>}
          onPress={handleLogout}
        />
      </HStack>

      <VStack flex={1} px={6}>
        <HStack w="full" mt={8} mb={4} justifyContent="space-between" alignItems={"center"}>
          <Heading color="gray.100">
            Meus Chamados
          </Heading>

          <Text color="gray.200">
            1
          </Text>
        </HStack>

        <HStack space={3} mb={8}>
        <Filter
          type="open"
          title="em andamento"
          onPress={() => setStatusSelected('open')}
          isActive={statusSelected === 'open'}
        />

        <Filter
          type="closed"
          title="finalizados"
          onPress={() => setStatusSelected('closed')}
          isActive={statusSelected === 'closed'}
          />
      </HStack>

    {  
      isLoading ? <Loading/> :
    <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={({item}) => <Order data={item} onPress={()=>handleOpenDetails(item.id)}/>}
        showsVerticalScrollIndicator={false}
        _contentContainerStyle={{paddingBottom: 100}}
        ListEmptyComponent={() => (
        <Center>
          <FontAwesomeIcon icon={faMessage} size={40} color={colors.gray[300]}/>
          <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
            Você ainda não possui {'\n'}
            solicitações {statusSelected === 'open' ? 'em andamento' : 'finalizadas'}
          </Text>
        </Center>
        )}
        />}

        <Button title="Nova Solicitação" onPress={handleNewOrder}/>
      </VStack>
    </VStack>
  );
}
