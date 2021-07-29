import React,{useState, useEffect} from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useForm, Controller } from "react-hook-form";

//REDUX
import {connect,useSelector,useDispatch} from 'react-redux'
import {editPerson} from '../redux/action'

//COMPONENTS
import { Platform,TextInput, Text, View, Image,Pressable,TouchableWithoutFeedback, Keyboard } from 'react-native';
import {styles} from '../components/Style'
import FormField from '../components/form/FormField';
import { formData } from '../components/form/formData';
import {Button} from '../components/Button'

 const Edit = (props) => {
   const [formValues, handleFormValueChange, setFormValues] = formData({
    ...props.user
  })
  const [image, setImage] = useState(null);

   const { control, handleSubmit, formState: { errors } } = useForm();

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const submitEditBtn = () => {
    for(let key in formValues){
      if(formValues[key] == '' && props.user[key] != ''){
        formValues[key] = props.user[key]
      }
    }

    if(image){
      formValues.img = image
    }
    dispatch(editPerson(formValues))
  }

  return (

      <View style={[styles.container,styles.containerWithoutBlock,]}>
        <View style={styles.editNameOrSurnameOrImgWrapper}>
          <View style={{position:'relative'}}>
            <Image source = {{uri:image || props.user.img}} style={[styles.avaImg,{width:100,height:100}]}/>
            <Pressable
                onPress={pickImage}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed
                      ? 'rgba(0,0,0,0.6)'
                      : 'rgba(0,0,0,0.3)'
                  },styles.editImageWrapperAdd,styles.avaImg]}
            >
              <Ionicons name="camera-outline" size={30} color="white" />
            </Pressable>

          </View>
          <View style={styles.editNameOrSurnameWrapper}>
            <FormField
                styleLabel = {[styles.all,styles.labelEdit]}
                styleInput = {[styles.all,styles.input,styles.editNameInput,styles.editNameOrSurnameInput]}
                label=""
                formKey='username'
                placeholder={props.user.username}
                textInputProps={{
                  maxLength:15
                }}
                handleFormValueChange={handleFormValueChange}
              />
            <FormField
              styleLabel = {[styles.all,styles.labelEdit]}
              styleInput = {[styles.all,styles.input,styles.editNameOrSurnameInput,styles.editSurnameInput]}
              label=""
              formKey='surname'
              textInputProps={{
                maxLength:15
              }}
              placeholder={props.user.surname || 'Фамилия'}
              handleFormValueChange={handleFormValueChange}
            />
          </View>
        </View>
        <FormField
          styleLabel = {[styles.all,styles.labelEdit]}
          styleInput = {[styles.all,styles.input]}
          label="Электронная почта"
          formKey='email'
          placeholder={props.user.email || ''}
          textInputProps={{
            autoCapitalize: "none",
            keyboardType:'email-address',
            maxLength:15
          }}
          handleFormValueChange={handleFormValueChange}
        />
        <FormField
          styleLabel = {[styles.all,styles.labelEdit]}
          styleInput = {[styles.all,styles.input]}
          label="Телефон"
          formKey='tel'
          placeholder={props.user.tel || ''}
          textInputProps={{
            autoCapitalize: "none",
            keyboardType:'phone-pad',
          }}
          handleFormValueChange={handleFormValueChange}
        />
        <FormField
          styleLabel = {[styles.all,styles.labelEdit]}
          styleInput = {[styles.all,styles.input]}
          label="Пароль"
          formKey='password'
          placeholder=''
          textInputProps={{
            autoCapitalize: "none",
            secureTextEntry:true
          }}
          handleFormValueChange={handleFormValueChange}
        />
        <Button title='Сохранить' onPress={()=>{submitEditBtn()}}/>
      </View>

)
};

Edit.navigationOptions = {
    title: 'Edit'
};

let mapStoreToProps = (store) => ({
  user:store.register.user
})

export default connect(mapStoreToProps)(Edit)
