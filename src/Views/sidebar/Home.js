import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import io from 'socket.io-client';
import MapView, { Marker } from 'react-native-maps';
import * as Notifications from 'expo-notifications';

import { getLocation, convertLocationToAddress } from '../../util/locationHelper';
import ModalNotification from '../../components/Modal/ModalNotification';
import pushNotificationsRegister from '../../util/pushNotificationsRegister';
import styles from './HomeStyle';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

const Home = ({ navigation }) => {
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const [receiveRequests, setReceiveRequests] = useState(false);
    const [ReceivedRequestData, setReceivedRequestData] = useState(true);
    const [partnerLocation, setPartnerLocation] = useState(null);

    const notificationListener = useRef();
    const responseListener = useRef();

    const socket = io('http://192.168.0.102:3000'); // https://railwaytest-production-a531.up.railway.app/

    const handleToggleReceiveRequests = () => {
        if (!receiveRequests) {
            socket.emit('send-expo-push-token', { token: expoPushToken });
            console.log('token: ', expoPushToken);
        } else {
            socket.emit('close-connect');
        }

        setReceiveRequests(!receiveRequests);
    };

    useEffect(() => {
        // Get position Partner
        (async () => {
            const location = await getLocation();
            if (location) {
                setPartnerLocation(location);
            }
        })();

        // Register receive notification
        pushNotificationsRegister().then((token) => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
            console.log(response);
        });

        // Get data From WebSocket
        socket.on('new-rescue-request', (data) => {
            console.log('Nhận thông báo từ customer:', data);
            (async () => {
                // convert customer's location to address:
                let add = await convertLocationToAddress(data.location);
                console.log(add);
                // Cập nhật state để hiển thị thông báo chi tiết
                setReceivedRequestData({
                    message: data.message,
                    address: `${add.street}, ${add.district}, ${add.subregion}, ${add.city}`,
                });
                setIsAlertVisible(true);
            })();
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    const toggleAlert = () => {
        setIsAlertVisible(!isAlertVisible);
    };
    return (
        <>
            <View style={styles.container}>
                {partnerLocation && (
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: partnerLocation.coords.latitude,
                            longitude: partnerLocation.coords.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        <Marker
                            coordinate={{
                                latitude: partnerLocation.coords.latitude,
                                longitude: partnerLocation.coords.longitude,
                            }}
                            title="Your Location"
                            description="You are here!"
                        ></Marker>
                    </MapView>
                )}
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.btnOpenReceiveRequest}
                    onPress={handleToggleReceiveRequests}
                >
                    <Text style={styles.btnText}>
                        {receiveRequests ? 'Đã bật chế độ nhận yêu cầu' : 'Mở chế độ nhận yêu cầu'}
                    </Text>
                </TouchableOpacity>
                <ModalNotification
                    isVisible={isAlertVisible}
                    senderInfo={ReceivedRequestData}
                    toggleAlert={toggleAlert}
                    navigation={navigation}
                />
            </View>
        </>
    );
};

export default Home;
