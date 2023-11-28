import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import styles from './RepairItemStyle';
import WebSocketManager from '../../util/WebSocketManager';
import axios from 'axios';
import RepairService from './RepairService';
import { useSelector, useDispatch } from 'react-redux';
import { costSlice } from '../../redux/reducers/costSlice';

const RepairItem = ({ navigation }) => {
    const [dataServices, setDataServices] = useState([]);
    const [totalCost, setTotalCost] = useState(0);

    const cost = useSelector((state) => state.cost.costData);

    const dispatch = useDispatch();
    const webSocket = new WebSocketManager();

    useEffect(() => {
        const getAPIServices = async () => {
            try {
                await axios.get('http://192.168.1.99:8080/api/get-all-services').then((res) => {
                    setDataServices(res.data.DT);
                });
            } catch (error) {
                console.log('Axios error: ', error);
            }
        };

        getAPIServices();
    }, []);

    useEffect(() => {
        let totaLabel = 0;
        if (cost) {
            cost.map((item) => {
                let keyss = Object.keys(item)[0];
                item[keyss].map((val) => {
                    totaLabel += val.price;
                });
            });
            setTotalCost(totaLabel);
        }
    });

    const handleSendCost = async () => {
        if (!cost || totalCost === 0) {
            Alert.alert('Bạn chưa chọn các mục cần sửa để báo cho khách hàng!');
            return;
        } else {
            webSocket.sendCostNotice(cost);
            try {
                await costSlice.actions.clearCostData();
            } catch (error) {
                console.log(error);
            }
        }
    };

    console.log('cost:', cost);

    const config = { style: 'currency', currency: 'VND', maximumFractionDigits: 9 };
    const formated = new Intl.NumberFormat('vi-VN', config).format(totalCost);

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>BÁO CHI PHÍ SỬA CHỮA</Text>
                <View style={styles.itemContainer}>
                    {dataServices &&
                        dataServices.map((service) => <RepairService key={service.id} dataService={service} />)}
                </View>

                <Text style={styles.textTotalPrice}>
                    Tổng chi phí : <Text style={styles.colorRed}> {formated}</Text>
                </Text>
                <TouchableOpacity activeOpacity={0.8} style={styles.helpBtn} onPress={handleSendCost}>
                    <Text style={styles.btnText}>Báo giá cho khách hàng</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default RepairItem;
