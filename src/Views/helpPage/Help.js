import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './HelpStyle';
import WebSocketManager from '../../util/WebSocketManager';
const Help = ({ navigation }) => {
    const [isShowRepairItem, setIsShowRepairItem] = useState(false);
    const webSocket = new WebSocketManager();
    const toggleOpen = () => {
        if (isShowRepairItem) {
            navigation.navigate('RepairItem');
        }
        webSocket.sendCameNotification();
        setIsShowRepairItem(!isShowRepairItem);
    };

    return (
        <>
            <View style={styles.helpContainer}>
                <View style={styles.helpContent}>
                    <View style={styles.customerInfo}>
                        <Text style={styles.customerTitle}>Phạm Dgoon</Text>
                        <Text style={styles.customerSDT}>0866920451</Text>
                    </View>
                    <View style={styles.line}></View>
                    <View style={styles.customerAddress}>
                        <Text style={styles.text}>Vị trí sửa chữa</Text>
                        <Text style={styles.customerSDT}>321 Nguyễn Văn Linh, Hải Châu, Đà Nẵng</Text>
                    </View>
                    <View style={styles.carInfo}>
                        <Text style={styles.text}>Thông tin</Text>
                        <Text style={styles.carCompany}>Hãng xe: BMW I7</Text>
                        <Text style={styles.carLicensePlates}>Biển số: 43A6789</Text>
                    </View>
                    <View style={styles.carStatus}>
                        <Text style={styles.text}>Tình trạng</Text>
                        <Text style={styles.carStatusDetail}>Xe không nổ máy, chết nước, ...</Text>
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
