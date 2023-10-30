import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Images from '../../assets/Images';
import { MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';

import Notification from '../Views/sidebar/Notification';
import Setting from '../Views/sidebar/Setting';
import History from '../Views/sidebar/History';
import Home from '../Views/sidebar/Home';
import Profile from '../Views/sidebar/Profile';
import Income from '../Views/sidebar/Income';
import Help from '../Views/Help/Help';
import RepairItem from '../Views/Help/RepairItem';

const Drawer = createDrawerNavigator();

const MainDrawer = () => {
    return (
        <NavigationContainer independent={true}>
            <Drawer.Navigator
                drawerContent={(props) => {
                    return (
                        <SafeAreaView>
                            <View
                                style={{
                                    height: 100,
                                    width: '100%',
                                    borderBottomColor: '#Fff',
                                    borderBottomWidth: 1,
                                    flexDirection: 'row',
                                    gap: 10,
                                    alignItems: 'center',
                                    marginBottom: 20,
                                }}
                            >
                                <Image
                                    source={Images.profile}
                                    style={{
                                        height: 60,
                                        width: 60,
                                        borderRadius: 30,
                                        marginLeft: 20,
                                    }}
                                />
                                <View
                                    style={{
                                        flexDirection: 'column',
                                    }}
                                >
                                    <Text style={{ color: 'blue', fontWeight: 500 }}>Phạm Dgoon</Text>
                                    <Text style={{ color: '#FFF' }}>Kỹ thuật viên</Text>
                                </View>
                            </View>

                            <DrawerItemList {...props} />
                        </SafeAreaView>
                    );
                }}
                screenOptions={{
                    drawerStyle: {
                        backgroundColor: '#FF7527',
                        width: 200,
                    },
                    drawerLabelStyle: {
                        color: '#fff',
                    },
                }}
            >
                <Drawer.Screen
                    name="Home"
                    options={{
                        drawerLabel: 'Home',
                        title: 'Home',
                        drawerIcon: () => <SimpleLineIcons name="home" size={20} color="#fff" />,
                    }}
                    component={Home}
                />
                <Drawer.Screen
                    name="History"
                    options={{
                        drawerLabel: 'History',
                        title: 'History',
                        drawerIcon: () => <SimpleLineIcons name="clock" size={20} color="#fff" />,
                    }}
                    component={History}
                />
                <Drawer.Screen
                    name="Income"
                    options={{
                        drawerLabel: 'Income',
                        title: 'Income',
                        drawerIcon: () => <SimpleLineIcons name="wallet" size={20} color="#fff" />,
                    }}
                    component={Income}
                />
                <Drawer.Screen
                    name="Notification"
                    options={{
                        drawerLabel: 'Notification',
                        title: 'Notification',
                        drawerIcon: () => <SimpleLineIcons name="bell" size={20} color="#fff" />,
                    }}
                    component={Notification}
                />
                <Drawer.Screen
                    name="Profile"
                    options={{
                        drawerLabel: 'Profile',
                        title: 'Profile',
                        drawerIcon: () => <SimpleLineIcons name="user" size={20} color="#fff" />,
                    }}
                    component={Profile}
                />
                <Drawer.Screen
                    name="Setting"
                    options={{
                        drawerLabel: 'Setting',
                        title: 'Setting',
                        drawerIcon: () => <SimpleLineIcons name="settings" size={20} color="#fff" />,
                    }}
                    component={Setting}
                />
                <Drawer.Screen
                    name="Help"
                    options={{
                        drawerLabel: '',
                        title: 'Help',
                    }}
                    component={Help}
                />
                <Drawer.Screen
                    name="RepairItem"
                    options={{
                        drawerLabel: '',
                        title: 'RepairItem',
                    }}
                    component={RepairItem}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

export default MainDrawer;
