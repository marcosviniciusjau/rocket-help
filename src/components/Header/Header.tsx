import React from 'react';
import { HStack, Heading, IconButton,StyledProps,useTheme } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';

type Props= StyledProps & {
    title:string;
}
export function Header({title,...rest}:Props) {
    const {colors} = useTheme();
    const navigation = useNavigation();

    function handleGoBack() {
        navigation.goBack();
    }

  return (
    <HStack 
        bg="gray.600"
        w="full"
        justifyContent="space-between"
        alignItems="center"
        pb={6}
        pt={12}
        {...rest}
    >
        <IconButton 
            icon={<FontAwesomeIcon icon={faCaretLeft} size={24} color={colors.gray[200]}/>}
            onPress={handleGoBack}
        />

        <Heading 
         color="gray.100"
         textAlign="center"
         fontSize="lg"
         flex={1}
         ml={-6}
        >
          {title}
        </Heading>
    </HStack>
  );
}