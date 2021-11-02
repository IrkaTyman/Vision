import React from 'react';
import {Image, Text, View, ScrollView, FlatList} from 'react-native';
import {Button} from '../../components/Button'
import InfoAllUsers from '../../components/InfoAllUsers'

import {connect,useSelector,useDispatch} from 'react-redux'
import {actionCreators as actions,addPerson} from '../../redux/action'
import {styles,colors} from '../../components/Style'

 const AllClients = ({user,navigation,allOrders,allClients}) => {
    return (
      <ScrollView style={[styles.container,styles.profileWrapper,styles.p_fsm]}>
        {allClients[0] ?
          <FlatList
            data={allClients}
            renderItem={({item}) => (
              <InfoAllUsers data={item} />
            )}
          /> :
            <View style={[styles.notOrder,styles.flex,styles.ai_c,styles.jc_c]}>
              <Text style={[styles.all,styles.bold,styles.darkPinkColor]}>
                Пока здесь никого нет
              </Text>
            </View>}
      </ScrollView>
    );
};

AllClients.navigationOptions = {
    title: 'All Clients'
};

let mapStoreToProps = (store) => ({
  user:store.register.user,
  allClients:store.register.allClients,
})

export default connect(mapStoreToProps)(AllClients)
