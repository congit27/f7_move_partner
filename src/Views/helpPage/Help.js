import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './HelpStyle';
import { getLocation, convertLocationToAddress } from '../../util/locationHelper';

import WebSocketManager from '../../util/WebSocketManager';
const Help = ({ navigation, route }) => {
    const [isShowRepairItem, setIsShowRepairItem] = useState(false);
    const webSocket = new WebSocketManager();
    const toggleOpen = () => {
        if (isShowRepairItem) {
            navigation.navigate('RepairItem');
        }
        webSocket.sendCameNotification();
        setIsShowRepairItem(!isShowRepairItem);
    };
    const data = route.params;

    return (
        <>
            <View style={styles.helpContainer}>
                <View style={styles.helpContent}>
                    <View style={styles.customerInfo}>
                        <Text style={styles.customerTitle}>{data.name}</Text>
                        <Text style={styles.customerSDT}>{data.phone}</Text>
                    </View>
                    <View style={styles.line}></View>
                    <View style={styles.customerAddress}>
                        <Text style={styles.text}>Vị trí sửa chữa</Text>
                        <Text style={styles.customerSDT}>{data.address}</Text>
                    </View>
                    <View style={styles.carInfo}>
                        <Text style={styles.text}>Thông tin</Text>
                        <Text style={styles.carCompany}>Hãng xe: {data.carBrand}</Text>
                        <Text style={styles.carLicensePlates}>Biển số: {data.licensePlates}</Text>
                    </View>
                    <View style={styles.carStatus}>
                        <Text style={styles.text}>Tình trạng</Text>
                        <Text style={styles.carStatusDetail}>{data.statusContent}</Text>
                    </View>
                    <View>
                        <TouchableOpacity activeOpacity={0.8} style={styles.helpBtn} onPress={toggleOpen}>
                            <Text style={styles.btnText}>
                                {isShowRepairItem ? 'Báo chi phí sửa xe' : 'Đã đến điểm sửa chữa'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    );
};

export default Help;
