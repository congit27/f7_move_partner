import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, BackHandler, Alert, ToastAndroid } from 'react-native';
import styles from './ModalNotificationStyle';
import WebSocketManager from '../../util/WebSocketManager';
import { getLocation } from '../../util/locationHelper';
import { io } from 'socket.io-client';

const socket = io('https://f7movebackend-production.up.railway.app/');

const ModalNotification = ({ handleCloseModal, isVisible, toggleAlert, senderInfo, navigation }) => {
    const [location, setLocation] = useState(null);

    const webSocketManager = new WebSocketManager();

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
                setLocation(location);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        socket.on('customer_cancel_help', (data) => {
            handleCloseModal();
            showToastWithGravityAndOffset();
        });
    }, [socket]);

    const handleConfirm = () => {
        // Điều hướng đến trang "Help" khi người dùng xác nhận

        webSocketManager.sendAcceptRequestNotification(location);
        navigation.navigate('Help');
        console.log(senderInfo);
        toggleAlert();
    };

    const showToastWithGravityAndOffset = () => {
        ToastAndroid.showWithGravityAndOffset('Customer cancel!!!', ToastAndroid.LONG, ToastAndroid.TOP, 25, 50);
    };

    return (
        <>
            <Modal transparent={true} visible={isVisible} animationType="slide" onRequestClose={toggleAlert}>
                <View style={styles.alertContainer}>
                    <View style={styles.alertContent}>
                        <View style={styles.customerHeader}>
                            <Text style={styles.customerTitle}>Phạm Dgoon</Text>
                            <Text style={styles.customerSDT}>0866920451</Text>
                        </View>
                        <View style={styles.customerAddress}>
                            <Text style={styles.addressText}>Vị trí sửa chữa</Text>
                            <Text style={styles.customerSDT}>{senderInfo.address}</Text>
                        </View>
                        <View style={styles.carInfo}>
                            <Text style={styles.carText}>Thông tin</Text>
                            <Text style={styles.carCompany}>Hãng xe: BMW I7</Text>
                            <Text style={styles.carLicensePlates}>Biển số: 43A6789</Text>
                        </View>
                        <View style={styles.carStatus}>
                            <Text style={styles.carText}>Tình trạng</Text>
                            <Text style={styles.carStatusDetail}>Xe không nổ máy, chết nước, ...</Text>
                        </View>
                        <View style={styles.btnContainer}>
                            <TouchableOpacity style={styles.btnCancel} onPress={toggleAlert}>
                                <Text style={styles.btnTextCancel}>Bỏ qua</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnConfirm} onPress={handleConfirm}>
                                <Text style={styles.btnText}>Nhận</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
};

export default ModalNotification;
