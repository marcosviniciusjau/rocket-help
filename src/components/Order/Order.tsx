import React from 'react';
import { Box, Circle, HStack,Text,VStack,useTheme,Pressable,IPressableProps} from 'native-base';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faClock,faHourglass,faCircleCheck} from '@fortawesome/free-solid-svg-icons';

export type OrderProps={
    id:string;
    patrimony:string;
    when:string;
    status:'open' | 'closed';
}

type Props= IPressableProps & {
 data:OrderProps
}

export function Order({data,...rest}:Props) {

  const {colors} = useTheme();
  const statusColor = data.status === 'open' ? colors.secondary[700] : colors.green[300];

  return (
    <Pressable {...rest}>
         <HStack
      bg="gray.600"
      justifyContent="space-between"
      rounded="sm"
      mb={4}
      alignItems="center"
      overflow="hidden"
    >
        <Box h="full" w={2} bg={statusColor}/>
        <VStack flex={1} my={5} ml={5}>
            <Text color="white" fontSize="md">
            Patrimônio {data.patrimony}
            </Text>

            <HStack alignItems="center">
                <FontAwesomeIcon icon={faClock} size={16} color={colors.gray[300]}/>
                <Text color="gray.200" fontSize="xs" ml={1}>
                {data.when}
                </Text>
            </HStack>
        </VStack>

        <Circle bg="gray500" h={12} w={12}>
        {
          data.status === 'closed' 
           ? <FontAwesomeIcon icon={faCircleCheck} size={24} color={statusColor}/>
           : <FontAwesomeIcon icon={faHourglass} size={24} color={statusColor}/>
        }
        </Circle>
    </HStack>
    </Pressable>
 
  );
}