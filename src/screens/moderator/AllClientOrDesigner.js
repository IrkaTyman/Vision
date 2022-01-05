import React from 'react';
import {Text, View, FlatList} from 'react-native';
import InfoAllUsers from '../../components/InfoAllUsers'

import {connect} from 'react-redux'
import {styles} from '../../components/Style'

 const AllClientsOrDesigner = ({navigation,route,allUsers}) => {
    const users = Object.keys(allUsers).filter(item => allUsers[item].status == route.name)
    return (
      users[0] ?
          <FlatList
            style={[styles.container,styles.profileWrapper,styles.p_fsm]}
            data={users}
            keyExtractor={(item,i)=>i.toString()}
            renderItem={({item}) => (
              <InfoAllUsers data={item} nav={navigation}/>
            )}
          /> :
            <View style={[styles.notOrder,styles.flex,styles.ai_c,styles.jc_c]}>
              <Text style={[styles.all,styles.bold,styles.darkPinkColor]}>
                Пока здесь никого нет
              </Text>
            </View>
    );
};

AllClientsOrDesigner.navigationOptions = {
    title: 'All Clients or Designer'
};

let mapStoreToProps = (store) => ({
  allUsers:store.register.allUsers,
})

export default connect(mapStoreToProps)(AllClientsOrDesigner)
