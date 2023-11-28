import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import styles from './RepairItemStyle';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import { useDispatch } from 'react-redux';
import { costSlice } from '../../redux/reducers/costSlice';

const RepairService = ({ navigation, dataService }) => {
    const [selected, setSelected] = useState('');
    const [dataItem, setDataItem] = useState([]);

    let newData;
    const dispatch = useDispatch();

    useEffect(() => {
        newData = dataService.details.map((item) => {
            return {
                key: item.id,
                value: item.nameServiceDetail,
                price: item.price,
            };
        });
        setDataItem(newData);
    }, []);

    // console.log('>>>Check data service:  ', selected);
    const handleSelect = async () => {
        try {
            const resultArray = dataItem.filter((item) => selected.includes(item.value));

            // console.log({ [dataService.nameService]: resultArray });
            await dispatch(costSlice.actions.setCostData({ [dataService.nameService]: resultArray }));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ScrollView>
            <View style={styles.serviceContainer}>
                <View style={[styles.dropdownStyle, { zIndex: 10 }]}>
                    <MultipleSelectList
                        setSelected={(val) => setSelected(val)}
                        data={dataItem}
                        save="value"
                        onSelect={handleSelect}
                        label={dataService.nameService}
                        badgeStyles={{ backgroundColor: 'green' }}
                        placeholder={dataService.nameService}
                        maxHeight={300}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

export default RepairService;
