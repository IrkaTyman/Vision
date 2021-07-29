import React from 'react';
import { Text, View, Button} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

const Headers = (props) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Helder</Text>
            <Button title='click' onPress={() => props.navigation.openDrawer()}/>
        </View>
    );
};

export default Headers;
