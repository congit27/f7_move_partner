import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, Button, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import ModalNotification from '../../components/Modal/ModalNotification';
import styles from './HomeStyle';
import io from 'socket.io-client';
import * as Notifications from 'expo-notifications';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import pushNotificationsRegister from '/CODE/Linhtinh/Demo_f7/f7_move_partner/src/until/pushNotificationsRegister';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

const Home = ({ navigation }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAlertVisible, setIsAlertVisible] = useState(true);
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const [receiveRequests, setReceiveRequests] = useState(false);
    const [ReceivedRequestData, setReceivedRequestData] = useState(false);
    const navigations = useNavigation(); // lấy navigation
    const [isAccidentVisible, setIsAccidentVisible] = useState(false);
    const [isAccidentReportVisible, setIsAccidentReportVisible] = useState(false);
    const [isModalNotificationVisible, setIsModalNotificationVisible] = useState(true);

    const [partnerLocation, setPartnerLocation] = useState(null);

    const notificationListener = useRef();
    const responseListener = useRef();

    const handleShowAccident = () => {
        setIsAccidentVisible(true);
    };

    const socket = io('https://railwaytest-production-a531.up.railway.app/');
    // https://railwaytest-production-a531.up.railway.app/
    const handleToggleReceiveRequests = () => {
        if (!receiveRequests) {
            socket.emit('send-expo-push-token', { token: expoPushToken });
        } else {
            socket.emit('close-connect');
        }

        setReceiveRequests(!receiveRequests);
    };
    useEffect(() => {
        // Get position Partner
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setPartnerLocation(location);
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
            console.log('Received rescue request:', data);

            (async () => {
                let add = await Location.reverseGeocodeAsync(data.location.coords); // convert customer's location to address
                // Display notification
                // Cập nhật state để hiển thị thông báo chi tiết
                setReceivedRequestData({
                    message: data.message,
                    address: `${add[0].street}, ${add[0].district}, ${add[0].subregion}, ${add[0].city}`,
                });
                setReceivedRequestData(requestInfo);
                setIsAlertVisible(true);
            })();
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };
    const toggleAlert = () => {
        setIsAlertVisible(!isAlertVisible);
    };
    return (
        <>
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <Marker coordinate={{ latitude: 37.78825, longitude: -122.4324 }} title="Marker" />
                </MapView>
                <View>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.btnOpenReceiveRequest}
                        onPress={handleToggleReceiveRequests}
                    >
                        <Text style={styles.btnText}>
                            {receiveRequests ? 'Đã bật chế độ nhận yêu cầu' : 'Mở chế độ nhận yêu cầu'}
                        </Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity activeOpacity={0.8} style={styles.btnOpenReceiveRequest} onPress={toggleAlert}>
                        <Text style={styles.btnText}>Hiển thị thông báo</Text>
                    </TouchableOpacity> */}
                </View>
                <ModalNotification isVisible={isAlertVisible} toggleAlert={toggleAlert} requestInfo={ReceivedRequestData} navigation={navigation} />
            </View>
        </>
    );
};

export default Home;
