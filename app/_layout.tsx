import { Stack } from "expo-router";

export default function Rootlayout(){

    const optionsStack = {
        title:'',
        headerTransparent:true,
        headerShown:false
    }

    return(
        <Stack>
            <Stack.Screen name="index" options={optionsStack} />
            <Stack.Screen name="fornecedores" options={optionsStack} />
        </Stack>
    )
}