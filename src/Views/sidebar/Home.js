import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, BackHandler } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Notifications from 'expo-notifications';
import axios from 'axios';

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
    const [routeData, setRouteData] = useState(null);

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
        const fetchRoute = async () => {
            if (partnerLocation && customerLocation) {
                const apiKey = '14W0x2W1ZCBpiFYpaedfKpDE70o91iKxslLyEfw2';
                try {
                    console.log(customerLocation.coords.longitude);
                    const response = await axios.get(
                        // `https://rsapi.goong.io/Direction?${customerLocation.coords.longitude},${customerLocation.coords.latitude};${partnerLocation.coords.longitude},${partnerLocation.coords.latitude}?key=${apiKey}`,
                        `https://rsapi.goong.io/Direction?origin=${partnerLocation.coords.latitude},${partnerLocation.coords.longitude}&destination=${customerLocation.coords.latitude},${customerLocation.coords.longitude}&vehicle=car&api_key=${apiKey}`,
                    );

                    if (response.status === 200) {
                        setRouteData(response.data);
                    } else {
                        console.error('Error fetching directions API:', response.data.message);
                    }
                } catch (error) {
                    console.error('Error fetching directions API!:', error.message);
                }
            }
        };

        fetchRoute();
    }, [partnerLocation, customerLocation]);

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

    function decodePolyline(polyline) {
        var points = [];
        var index = 0,
            len = polyline.length;
        var lat = 0,
            lng = 0;

        while (index < len) {
            var b,
                shift = 0,
                result = 0;
            do {
                b = polyline.charCodeAt(index++) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);
            var dlat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
            lat += dlat;

            shift = 0;
            result = 0;
            do {
                b = polyline.charCodeAt(index++) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);
            var dlng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
            lng += dlng;

            points.push({
                latitude: lat / 1e5,
                longitude: lng / 1e5,
            });
        }
        return points;
    }

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
                                    latitude: customerLocation.coords.latitude,
                                    longitude: customerLocation.coords.longitude,
                                }}
                                title="Customer's Location"
                                description="Come here!"
                            ></Marker>
                        )}
                        {routeData && (
                            <Polyline
                                coordinates={decodePolyline(routeData.routes[0].overview_polyline.points)}
                                strokeWidth={4}
                                strokeColor="#4285F4" // Màu của lộ trình
                            />
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
