import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "../screens/Home/Home";
import { Details } from "../screens/Details/Details";
import { Register } from "../screens/Register/Register";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
    return (
        <Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Screen
                name="home"
                component={Home}
            />
            <Screen
                name="details"
                component={Details}
            />  
            <Screen
                name="new" 
                component={Register}
            />
        </Navigator>
    )
}