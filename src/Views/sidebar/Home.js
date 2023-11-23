import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, BackHandler, Alert } from 'react-native';
import io from 'socket.io-client';
import MapView, { Marker } from 'react-native-maps';
import * as Notifications from 'expo-notifications';

import { getLocation, convertLocationToAddress } from '../../util/locationHelper';
import ModalNotification from '../../components/Modal/ModalNotification';
import styles from './HomeStyle';
import WebSocketManager from '../../util/WebSocketManager';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

const Home = ({ navigation }) => {
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [isReceivingRequest, setIsReceivingRequest] = useState(false);
    const [ReceivedRequestData, setReceivedRequestData] = useState({});
    const [partnerLocation, setPartnerLocation] = useState(null);
    const [customerLocation, setCustomerLocation] = useState(null);

    const webSocketManager = new WebSocketManager();

    const handleToggle = () => {
        setIsReceivingRequest(!isReceivingRequest);
        if (!isReceivingRequest) {
            webSocketManager.sendExpoPushToken();
        } else {
            webSocketManager.closeReceiveRequest();
            webSocketManager.disconnect();
        }
    };

    useEffect(() => {
        const backAction = () => {
            return true;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => backHandler.remove();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const location = await getLocation();
            if (location) {
                setPartnerLocation(location);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const listener = (data) => {
            setCustomerLocation(data.location);
            console.log(customerLocation);
            (async () => {
                let add = await convertLocationToAddress(data.location);
                setReceivedRequestData({
                    ...data,
                    address: `${add.street}, ${add.district}, ${add.subregion}, ${add.city}`,
                });
                setIsAlertVisible(true);
            })();
        };

        webSocketManager.addListener(listener);

        if (isReceivingRequest) {
            webSocketManager.receiveRequest();
        }

        return () => {
            webSocketManager.removeListener(listener);
        };
    }, [isReceivingRequest]);

    const toggleAlert = () => {
        setIsAlertVisible((prev) => !prev);
    };

    const handleCloseModal = () => {
        setIsAlertVisible(false);
        setCustomerLocation(null);
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
                        {customerLocation && (
                            <Marker
                                coordinate={{
                                    latitude: 16.08166, // customerLocation.coords.latitude
                                    longitude: 108.21615, // customerLocation.coords.longitude
                                }}
                                title="Customer's Location"
                                description="Come here!"
                            ></Marker>
                        )}
                    </MapView>
                )}
                <TouchableOpacity activeOpacity={0.8} style={styles.btnOpenReceiveRequest} onPress={handleToggle}>
                    <Text style={styles.btnText}>
                        {isReceivingRequest ? 'Đã bật chế độ nhận yêu cầu' : 'Mở chế độ nhận yêu cầu'}
                    </Text>
                </TouchableOpacity>
                <ModalNotification
                    isVisible={isAlertVisible}
                    senderInfo={ReceivedRequestData}
                    toggleAlert={toggleAlert}
                    navigation={navigation}
                    handleCloseModal={handleCloseModal}
                />
            </View>
        </>
    );
};

export default Home;
