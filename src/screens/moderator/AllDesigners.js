import React from 'react';
import {Image, Text, View, ScrollView, FlatList} from 'react-native';
import {Button} from '../../components/Button'
import InfoAllUsers from '../../components/InfoAllUsers'

import {connect,useSelector,useDispatch} from 'react-redux'
import {actionCreators as actions,addPerson} from '../../redux/action'
import {styles,colors} from '../../components/Style'

 const AllDesigners = ({user,navigation,allOrders,allDesigners}) => {
   console.log(allDesigners)
    return (
      <ScrollView style={[styles.container,styles.profileWrapper,styles.p_fsm]}>
        {allDesigners[0] ?
          <FlatList
            data={allDesigners}
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

AllDesigners.navigationOptions = {
    title: 'All Designers'
};

let mapStoreToProps = (store) => ({
  user:store.register.user,
  allDesigners:store.register.allDesigners,
})

export default connect(mapStoreToProps)(AllDesigners)
