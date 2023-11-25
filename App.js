import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from './src/Views/splash/splash';
import LoginRegister from './src/Views/loginRegister/loginRegister';
import OtpVerifier from './src/Views/otpVerifier/otpVerifier';
import Home from './src/Views/sidebar/Home';
import MainDrawer from './src/components/MainDrawer';
import Help from './src/Views/helpPage/Help';
import RepairItem from './src/Views/helpPage/RepairItem';
const Stack = createNativeStackNavigator();

export default function App() {
    const forFade = ({ current }) => ({
        cardStyle: {
            opacity: 0,
        },
    });
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    cardStyleInterpolator: forFade,
                }}
                initialRouteName="Splash"
            >
                <Stack.Screen name="Splash" component={Splash} options={{ cardStyleInterpolator: forFade }} />
                <Stack.Screen
                    name="LoginRegister"
                    component={LoginRegister}
                    options={{ cardStyleInterpolator: forFade }}
                />
                <Stack.Screen name="OtpVerifier" component={OtpVerifier} options={{ cardStyleInterpolator: forFade }} />
                <Stack.Screen name="Home" component={Home} options={{ cardStyleInterpolator: forFade }} />
                <Stack.Screen name="MainDrawer" component={MainDrawer} options={{ cardStyleInterpolator: forFade }} />
                <Stack.Screen name="Help" component={Help} options={{ cardStyleInterpolator: forFade }} />
                <Stack.Screen name="RepairItem" component={RepairItem} options={{ cardStyleInterpolator: forFade }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
