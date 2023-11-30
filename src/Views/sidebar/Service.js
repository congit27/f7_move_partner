import React from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import Confirm from './serviceTabs/Confirm';
import History from './serviceTabs/History';

const renderScene = SceneMap({
    first: Confirm,
    second: History,
});

const Service = ({ navigation }) => {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Đã xác nhận' },
        { key: 'second', title: 'Lịch sử' },
    ]);

    return (
        <>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
            />
        </>
    );
};

export default Service;
