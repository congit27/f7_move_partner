import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, TextInput } from 'react-native';
import styles from './RepairItemStyle';
import DropDownPicker from 'react-native-dropdown-picker';
import Images from '../../../assets/Images';

const RepairItem = ({ navigation }) => {
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [currentValue1, setCurrentValue1] = useState([]);
    const [currentValue2, setCurrentValue2] = useState([]);

    const items1 = [
        { label: 'Thay nhớt', value: 'thaynhot' },
        { label: 'Thay bugi', value: 'thaybugi' },
        { label: 'Thay lốp', value: 'thaylop' },
    ];
    const items2 = [
        { label: 'Sửa chữa van', value: 'suachuavan' },
        { label: 'Làm sạch động cơ', value: 'lamsachdongco' },
        { label: 'Thay dây', value: 'thayday' },
    ];

    return (
        <View style={styles.repairItemContainer}>
            <View style={styles.repairItemContent}>
                <Text style={styles.text}>Các hạng mục cần sửa</Text>
                <TouchableOpacity style={styles.repairItem}>
                    <View style={styles.repairItemLeft}>
                        <Image style={styles.image} source={Images.maintenance} />
                    </View>
                    <View style={styles.repairItemRight}>
                        <Text style={styles.textTitle}>Thay thế và bảo dưỡng</Text>
                        <Text style={styles.textDetail}>Các vấn đề không thể sửa</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.repairItem}>
                    <View style={styles.repairItemLeft}>
                        <Image style={styles.image} source={Images.maintenance} />
                    </View>
                    <View style={styles.repairItemRight}>
                        <Text style={styles.textTitle}>Sửa chữa hệ thống động cơ</Text>
                        <Text style={styles.textDetail}>Các vấn đề liên quan đến động cơ</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.repairItem}>
                    <View style={styles.repairItemLeft}>
                        <Image style={styles.image} source={Images.maintenance} />
                    </View>
                    <View style={styles.repairItemRight}>
                        <Text style={styles.textTitle}>Sửa chữa hệ thống điện và điện tử</Text>
                        <Text style={styles.textDetail}>Các vấn đề liên quan đến hệ thống điện</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.repairItem}>
                    <View style={styles.repairItemLeft}>
                        <Image style={styles.image} source={Images.maintenance} />
                    </View>
                    <View style={styles.repairItemRight}>
                        <Text style={styles.textTitle}>Sửa chữa hệ thống truyền động</Text>
                        <Text style={styles.textDetail}>Các vấn đề liên quan đến truyền động</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.repairItem}>
                    <View style={styles.repairItemLeft}>
                        <Image style={styles.image} source={Images.maintenance} />
                    </View>
                    <View style={styles.repairItemRight}>
                        <Text style={styles.textTitle}>Sửa chữa hệ thống làm lạnh nóng</Text>
                        <Text style={styles.textDetail}>Các vấn đề liên quan đến làm lạnh nóng</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.repairItem}>
                    <View style={styles.repairItemLeft}>
                        <Image style={styles.image} source={Images.maintenance} />
                    </View>
                    <View style={styles.repairItemRight}>
                        <Text style={styles.textTitle}>Sửa chữa hệ thống phanh</Text>
                        <Text style={styles.textDetail}>Các vấn đề liên quan</Text>
                    </View>
                </TouchableOpacity>
                {/* <View style={styles.dropdownStyle}>
                    <DropDownPicker
                        items={items1}
                        open={isOpen1}
                        setOpen={setIsOpen1}
                        value={currentValue1}
                        setValue={(val) => setCurrentValue1(val)}
                        placeholder="Thay thế và bảo dưỡng"
                        placeholderStyle={{ color: '#03337A', fontWeight: 'bold', fontSize: 16 }}
                        showTickIcon={true}
                        showArrowIcon={true}
                        disableBorderRadius={false}
                        multiple={true}
                        min={1}
                        max={4}
                        mode="BADGE"
                        badgeColors={['#6AA5FD']}
                        badgeTextStyle={{ color: '#FFF' }}
                        badgeDotColors={['white']}
                    />
                </View>
                <View style={styles.dropdownStyle}>
                    <DropDownPicker
                        items={items2}
                        open={isOpen2}
                        setOpen={setIsOpen2}
                        value={currentValue2}
                        setValue={(val) => setCurrentValue2(val)}
                        placeholder="Sửa chữa hệ thống và động cơ"
                        placeholderStyle={{ color: '#03337A', fontWeight: 'bold', fontSize: 16 }}
                        showTickIcon={true}
                        showArrowIcon={true}
                        disableBorderRadius={true}
                        multiple={true}
                        min={1}
                        max={4}
                        mode="BADGE"
                        badgeColors={['#6AA5FD']}
                        badgeTextStyle={{ color: '#FFF' }}
                        badgeDotColors={['white']}
                    />
                </View> */}
            </View>
        </View>
    );
};

export default RepairItem;