import React from 'react';
import { Text, View, Button} from 'react-native';
const SignIn = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>SignIn</Text>
        </View>
    );
};
SignIn.navigationOptions = {
    title: 'SignIn'
};
export default SignIn;
