import {ActivityIndicator, PaperProvider, ProgressBar} from "react-native-paper";
import {LoginScreen} from "./src/screens/LoginScreen";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {HomeScreen} from "./src/screens/HomeScreen/HomeScreen";
import {JSX, useEffect, useState} from "react";
import {onAuthStateChanged} from '@firebase/auth';
import {auth} from './src/configs/FirebaseConfig';
import {StyleSheet, View} from "react-native";
import {DetailEmailScreen} from "./src/screens/DetailEmailScreen";

interface IRoutes {
    name: string;
    screen: () => JSX.Element;
    headerShown?: boolean
}

const Stack = createNativeStackNavigator();
export default function App() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isAuth, setIsAuth] = useState<boolean>(false);

    const routesAuth: IRoutes[] = [
        {name: "Login", screen: LoginScreen}
    ];

    const routes: IRoutes[] = [
        {name: "Home", screen: HomeScreen},
        {name: "Detail", screen: DetailEmailScreen, headerShown: true},
    ];

    useEffect(() => {
            setIsLoading(true)
            onAuthStateChanged(auth, (user) => {
                    if (user) {
                        const uid = user.uid;
                        setIsAuth(true)
                    }
                setIsLoading(false)
                }
            )
        }, []
    )
    return (
        <PaperProvider>

            {isLoading ?
                (
                    <View style={styles.root}>
                        <ActivityIndicator size={30}/>
                    </View>
                )
                :(
                <NavigationContainer>
                    <Stack.Navigator>
                        {
                            !isAuth ?
                                routesAuth.map((item, index) => (
                                    <Stack.Screen key={index} options={{headerShown: true}} name={item.name}
                                                  component={item.screen}/>
                                ))
                                :
                                routes.map((item, index) => (
                                    <Stack.Screen key={index} options={{headerShown: item.headerShown ?? false}} name={item.name}
                                                  component={item.screen}/>
                                ))
                        }
                    </Stack.Navigator>
                </NavigationContainer>)}
        </PaperProvider>
    );
}

const styles= StyleSheet.create({
    root:{
        flex: 1,
        justifyContent: "center",
        alignItems:"center"
    }
})
