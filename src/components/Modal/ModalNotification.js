import React, {useState, useEffect} from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import styles from './ModalNotificationStyle';
import io from 'socket.io-client';


const ModalNotification = ({ isVisible, toggleAlert, senderInfo, navigation }) => {
    const socket = io('https://railwaytest-production-a531.up.railway.app/');
    const [errorMsg, setErrorMsg] = useState(null);
    const [location, setLocation] = useState(null);

    const handelAccept = () => {
      console.log('Gửi thông báo thành công');
      socket.emit('Response', {message: 'Yêu cầu được chấp nhận.'})
  
    }

    const handleConfirm = () => {
        // Điều hướng đến trang "Help" khi người dùng xác nhận
        handelAccept();
        navigation.navigate('Help');
        console.log(senderInfo);
        toggleAlert();
    };
    useEffect(() => {
      (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
              setErrorMsg('Permission to access location was denied');
              return;
          }

          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
      })();
  }, []);

    return (
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
    );
};

export default ModalNotification;
