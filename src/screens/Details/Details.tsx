import { useEffect,useState } from 'react';
import { Alert } from 'react-native';
import { VStack,Text, HStack,useTheme, ScrollView, Box } from 'native-base';
import {  useNavigation, useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { OrderDTO } from '../../DTOs/OrderDTO';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleCheck,faHourglass,faDesktop,faClipboard } from '@fortawesome/free-solid-svg-icons';
import { dateFormat } from '../../utils/dateFormat';

import { Header } from '../../components/Header/Header';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { OrderProps } from '../../components/Order/Order';
import { Loading } from '../../components/Loading';
import { CardDetails } from '../../components/CardDetails/CardDetails';

type RouteParams = {
  orderId: string;
}

type OrderDetails = OrderProps & {
  description: string;
  solution: string;
  closed: string;
}

export function Details() {
  const [solution,setSolution] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [order,setOrder] = useState<OrderDetails>({} as OrderDetails);
  
  const route = useRoute();
  const {orderId} = route.params as RouteParams;

  const {colors} = useTheme();
  const navigation= useNavigation()

  function handleOrderClose(){
    if(!solution){
      return Alert.alert('Solução obrigatória', 'Informe a solução para encerrar a solicitação');
    }

    firestore()
    .collection<OrderDTO>('orders')
    .doc(orderId)
    .update({
      status: 'closed',
      solution,
      closed_at: firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      Alert.alert('Solicitação', 'Solicitação encerrada');
      navigation.goBack();
    })
    .catch((error) => {
      console.log(error);
      Alert.alert('Solicitação', 'Não foi possível encerrar a solicitação');
    })
  }

  useEffect(() => {
    setIsLoading(true);
    firestore()
    .collection<OrderDTO>('orders')
    .doc(orderId)
    .get()
    .then((doc) => {
      const {
        patrimony,
        description,
        status,
        created_at,
        closed_at,
        solution
      } = doc.data();

      const closed = closed_at ? dateFormat(closed_at) : null;
      setOrder({
        id: doc.id,
        patrimony,
        description,
        status,
        solution,
        when: dateFormat(created_at),
        closed
      });
      setIsLoading(false);
    })
  },[])

  if(isLoading){
    return <Loading/>
  }

  return (
    <VStack flex={1} bg="gray.700">
      <Box px={6} bg="gray.600">
      <Header title="Solicitação"/>
      </Box>
      
        <HStack bg="gray.500" justifyContent="center" p={4} mb={5}>
          {
            order.status === 'closed' ? (
             <FontAwesomeIcon icon={faCircleCheck} size={24} color={colors.green[300]}/>
            ) : (
              <FontAwesomeIcon icon={faHourglass} size={24} color={colors.secondary[700]}/>
            )
          }

          <Text 
           color= {order.status === 'closed' ? colors.green[300] : colors.secondary[700]}
           fontSize="sm" ml={2} 
           textTransform="uppercase"
          >
           {order.status === 'closed' ? 'finalizado' : 'em andamento'}
          </Text>
        </HStack>
        <ScrollView mx={5} showsVerticalScrollIndicator={false}>
          <CardDetails
           title="equipamento"
           description={`Patrimônio ${order.patrimony}`}
           icon={faDesktop}
           footer={order.when}
          />

          <CardDetails
            title="descricão do problema"
            description={order.description}
            icon={faClipboard}
           />

           <CardDetails
              title="solução"
              icon={faCircleCheck}
             description={order.solution}
              footer={order.closed && `Finalizado em ${order.closed}`}	
            >
          {  
            order.status === 'open' &&
          <Input 
            placeholder="Descricão da solução"
             onChangeText={setSolution}
             h={24}
             textAlignVertical="top"
             multiline/>}
            </CardDetails>
        </ScrollView>

        {
          order.status === 'open' && (
            <Button 
             title="Encerrar solicitacao"
             m={5}
             onPress={handleOrderClose}
            />
          )
        }
    </VStack>
  );
}
