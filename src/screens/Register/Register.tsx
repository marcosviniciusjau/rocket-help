import { Center, Spinner, VStack } from "native-base";
import { Header } from "../../components/Header/Header";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
export function Register() {
    return (
        <VStack flex={1} bg="gray.700" p={6}>
           <Header title="Nova solicitação"></Header>

           <Input
              placeholder="Número do patrimônio"
              mt={4}
              />


            <Input
                placeholder="Descricão do problema"
                flex={1}
                mt={4}
                multiline
                textAlignVertical="top"
            />

            <Button
                title="Cadastrar"
                mt={5}
            />
        </VStack>
    );
}