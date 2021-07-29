import React, { Component } from "react";
import { Text,View, TextInput} from "react-native";
import {styles} from './Style'
import FormField from './form/FormField';
import { formData } from './form/formData';

export const FormOrders = (props) => {
  const [formValues, handleFormValueChange, setFormValues] = formData({
   username: '',
   email: '',
   password: ''
 })

 return (
   <View>
     <FormField
       formKey='username'
       placeholder='Your username'

       handleFormValueChange={handleFormValueChange}
     />
     <FormField
       formKey='email'
       placeholder='Your email id'
       textInputProps={{
         autoCapitalize: "none"
       }}
       handleFormValueChange={handleFormValueChange}
     />
     <FormField
       formKey='password'
       placeholder='Your password'
       textInputProps={{
         autoCapitalize: "none"
       }}
       handleFormValueChange={handleFormValueChange}
     />
     <Text style={styles.h3}>Values in Hook: </Text>
     <View>
       <Text style={styles.p}>Username is : {formValues.username}</Text>
       <Text style={styles.p}>Email is: {formValues.email}</Text>
       <Text style={styles.p}>Password is: {formValues.password}</Text>
     </View>
   </View>
 )
}
