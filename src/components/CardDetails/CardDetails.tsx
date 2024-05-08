import { ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IconLookup,IconName } from '@fortawesome/free-solid-svg-icons';
import { VStack,HStack,Text,Box,useTheme } from 'native-base';

type Props={
    title:string;
    description?:string;
    footer?:string;
    icon:IconLookup | IconName;
    children?:ReactNode
}
export function CardDetails({
  title,
  description,
  footer=null,
  icon:Icon,
  children
}:Props) {
  const {colors} = useTheme();

  return (
    <VStack bg="gray.600" p={5} mt={5} rounded="sm">

      <HStack alignItems="center" mb={4}>
        <FontAwesomeIcon icon={Icon} color={colors.primary[700]}/>
        <Text ml={2} color="gray.200" fontSize="sm" textTransform="uppercase">
          {title}
        </Text>
      </HStack>
        {
         !!description && 
         <Text color="gray.100" fontSize="md">
            {description}
         </Text>
        }
      { children }
        { !!footer && (
        <Box borderTopWidth={1} mt={3} borderTopColor="gray.400">
        <Text mt={3} color="gray.300" fontSize="sm">
          {footer}
        </Text>
        </Box>
      )}

    </VStack>
  );
}