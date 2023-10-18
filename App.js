import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from './src/Views/splash/splash';

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
