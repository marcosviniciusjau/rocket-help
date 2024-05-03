import {useState} from 'react';
import { HStack, Heading, IconButton, Text, VStack,useTheme } from 'native-base';

import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import Logo from '../../assets/logo_secondary.svg';

import { Filter } from '../../components/Filter/Filter';

export function Home() {
  const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>('open');
  const { colors } = useTheme();

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
      </VStack>
    </VStack>
  );
}