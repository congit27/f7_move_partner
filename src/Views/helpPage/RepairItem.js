import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { instance } from '../../util/api';

const data = [
    { label: 'Thay lốp', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
];



const DropdownComponent = () => {
    const [items, setItems] = useState([]);
    const [values, setValues] = useState([]);

    const [datas, setDatas] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseStatus = await instance.get(`/get-all-services`);
                console.log('>>>>>>>>>>>>', responseStatus.data);
                setItems(responseStatus.data.DT);
                const details = responseStatus.data.DT
                setDatas(details)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    let arr = []

    console.log(">>>>>>>>>>>", datas.map(detail => detail.details.map(item => [...arr, item])));

    return (
        <View style={styles.container}>
            {items.map((item, index) => (
                <Dropdown
                    key={item.id}
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={data}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!values[index] ? `${item.nameService}` : '...'}
                    searchPlaceholder="Search..."
                    onFocus={() => {}}
                    onBlur={() => {}}
                    value={values[index]}
                    onChange={(selectedItem) => {
                        setValues((prevValues) => {
                            const newValues = [...prevValues];
                            newValues[index] = selectedItem.value;
                            return newValues;
                        });
                    }}
                    renderLeftIcon={() => (
                        <AntDesign style={styles.icon} color={values[index] ? 'blue' : 'black'} name="Safety" size={20} />
                    )}
                />
            ))}
        </View>
    );
};

export default DropdownComponent;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 16,
        marginTop: 60,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});
