import {VStack,Heading,Icon,useTheme, View} from 'native-base'
import Logo from '../assets/logo_primary.svg'
import { Input } from '../components/Input'
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

export function SignIn(){
    const {colors}= useTheme()
    return(
        <VStack flex={1} alignItems={"center"} bg="gray.600" px={8} pt={24}>
            <Logo/>

           <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
            Acesse sua conta
           </Heading>

           <Input 
             placeholder="Email"
             mb={4}
             InputLeftElement={
               <View ml={4}>
                 <Icon as={<FontAwesomeIcon color={colors.gray[300]} icon={faEnvelope} />} />
               </View>
             }/>
           
           <Input 
             placeholder="Senha"
             InputLeftElement={
              <View ml={4}>
                <Icon as={<FontAwesomeIcon color={colors.gray[300]} icon={faKey} />} />
              </View>
            } secureTextEntry
             />
           
        </VStack>
    )
}