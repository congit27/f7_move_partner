import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './RepairItemStyle';
import DropDownPicker from 'react-native-dropdown-picker';
import WebSocketManager from '../../util/WebSocketManager';

const RepairItem = ({ navigation }) => {
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);

    const [currentValue1, setCurrentValue1] = useState([]);
    const [currentValue2, setCurrentValue2] = useState([]);
    const [currentValue3, setCurrentValue3] = useState([]);

    const webSocket = new WebSocketManager();

    let dataCo = {};
    // setDataCost({});
    const handleCostNotice = () => {
        dataCo = {
            currentValue1,
            currentValue2,
            currentValue3,
        };

        webSocket.sendCostNotice(dataCo);
    };
    console.log('Check costData:', dataCo);

    // Thêm useState cho giá trị tổng chi phí
    const [totalPrice, setTotalPrice] = useState(0);

    const items1 = [
        { label: 'Thay nhớt:  120.000', value: 'thaynhot', price: 120000 },
        { label: 'Thay bugi:  130.000', value: 'thaybugi', price: 130000 },
        { label: 'Thay lốp:  200.000', value: 'thaylop', price: 200000 },
    ];
    const items2 = [
        { label: 'Sửa chữa van:  120.000', value: 'suachuavan', price: 120000 },
        { label: 'Làm sạch động cơ:  230.000', value: 'lamsachdongco', price: 230000 },
        { label: 'Thay dây:  251.000', value: 'thayday', price: 251000 },
    ];
    const items3 = [
        { label: 'Sửa phanh:  456.000', value: 'suaphanh', price: 456000 },
        { label: 'Thay dầu phanh:  354.000', value: 'thaydauphanh', price: 354000 },
        { label: 'Thay lọc gió:  125.000', value: 'thaylocgio', price: 125000 },
    ];

    // Cập nhật tổng chi phí khi có sự thay đổi trong các mục đã chọn
    useEffect(() => {
        const calculateTotalPrice = () => {
            let total = 0;

            currentValue1.forEach((item) => {
                const selectedItem = items1.find((i) => i.value === item);
                if (selectedItem) {
                    total += selectedItem.price;
                }
            });

            currentValue2.forEach((item) => {
                const selectedItem = items2.find((i) => i.value === item);
                if (selectedItem) {
                    total += selectedItem.price;
                }
            });

            if (currentValue3) {
                currentValue3.forEach((item) => {
                    const selectedItem = items3.find((i) => i.value === item);
                    if (selectedItem) {
                        total += selectedItem.price;
                    }
                });
            }

            return total;
        };

        // Cập nhật giá trị tổng chi phí
        setTotalPrice(calculateTotalPrice());
    }, [currentValue1, currentValue2, currentValue3]);

    return (
        <View style={styles.repairItemContent}>
            <View style={[styles.dropdownStyle, { zIndex: 3 }]}>
                <DropDownPicker
                    items={items1}
                    open={isOpen1}
                    setOpen={setIsOpen1}
                    value={currentValue1}
                    setValue={setCurrentValue1}
                    placeholder="Thay thế và bảo dưỡng"
                    placeholderStyle={{ color: '#03337A', fontWeight: 'bold', fontSize: 16 }}
                    showTickIcon={true}
                    showArrowIcon={true}
                    multiple={true}
                    min={1}
                    max={4}
                    mode="BADGE"
                    badgeColors={['#6AA5FD']}
                    badgeTextStyle={{ color: '#FFF' }}
                    badgeDotColors={['white']}
                />
            </View>

            <View style={[styles.dropdownStyle, { zIndex: 2 }]}>
                <DropDownPicker
                    items={items2}
                    open={isOpen2}
                    setOpen={setIsOpen2}
                    value={currentValue2}
                    setValue={setCurrentValue2}
                    placeholder="Sửa chữa hệ thống và động cơ"
                    placeholderStyle={{ color: '#03337A', fontWeight: 'bold', fontSize: 16 }}
                    showTickIcon={true}
                    showArrowIcon={true}
                    multiple={true}
                    min={1}
                    max={4}
                    mode="BADGE"
                    badgeColors={['#6AA5FD']}
                    badgeTextStyle={{ color: '#FFF' }}
                    badgeDotColors={['white']}
                />
            </View>

            <View style={[styles.dropdownStyle, { zIndex: 1 }]}>
                <DropDownPicker
                    items={items3}
                    open={isOpen3}
                    setOpen={setIsOpen3}
                    value={currentValue3}
                    setValue={setCurrentValue3}
                    placeholder="Sửa chữa hệ thống và động cơ"
                    placeholderStyle={{ color: '#03337A', fontWeight: 'bold', fontSize: 16 }}
                    showTickIcon={true}
                    showArrowIcon={true}
                    multiple={true}
                    min={1}
                    max={4}
                    mode="BADGE"
                    badgeColors={['#6AA5FD']}
                    badgeTextStyle={{ color: '#FFF' }}
                    badgeDotColors={['white']}
                />
            </View>
            <Text style={styles.textTotalPrice}>Tổng chi phí : {totalPrice} VND</Text>
            <TouchableOpacity activeOpacity={0.8} style={styles.helpBtn} onPress={handleCostNotice}>
                <Text style={styles.btnText}>Báo giá cho khách hàng</Text>
            </TouchableOpacity>
        </View>
    );
};

export default RepairItem;
