export declare global{
    namespace ReactNavigation{
        interface RootParamList extends RootStackParamList{
            home: undefined
            details: { orderId: string }
            new: undefined
        }
    }
}