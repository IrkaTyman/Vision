import React,{useState} from 'react'
import {Button} from '../Button'
import {FormInput} from '../FormInput'
import {View,Text,Pressable} from 'react-native';
import {styles,fontSizeMain} from '../Style'
import { useForm, Controller } from "react-hook-form";
import {addPerson} from '../../redux/action'
import {connect} from 'react-redux'
import RadioForm, {RadioButton, RadioButtonInput} from 'react-native-simple-radio-button';
export const LogUp = (props) => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const designer = props.designer
  const repeatEmail = props.repeatEmail
  const radio_props = [
    {label: 'Заказчик', value: true },
    {label: 'Дизайнер', value: false }
  ];
  return(
    <View style={[styles.regPage,styles.ai_c,styles.jc_c]}>
      <View style={[styles.inputGroup]}>
        <Controller
          name="username"
          defaultValue=""
          control={control}
          rules={{
            required: true
          }}
          render={({ field: { onChange, value } }) => (
            <FormInput
                options={{
                  autoComplete:'name',
                   maxLength:15,
                   placeholder:'Имя',
                   onChangeText:(text) => onChange(text),
                   value:value
                }}
               styleInput = {[styles.all,styles.input,styles.regInput,styles.regInputLogUp]}
               onChangeText={(text) => onChange(text)}
               value={value}
               error={errors.username}
               errorText={errors?.username?.message}
             />
          )}
        />
        <Controller
          name="email"
          defaultValue=""
          control={control}
          rules={{
            required:true,
            pattern: {
              value: props.emailReg,
              message: 'Некорректный адрес'
            }
          }}
          render={({ field: { onChange, value } }) => (
            <FormInput
                options={{
                  autoComplete:'email',
                   placeholder:'Email',
                   onChangeText:(text) => onChange(text),
                   value:value
                }}
              label={repeatEmail ? "Данная почта зарегистрирована" : ''}
              styleLabel={[styles.repeatEmail]}
               styleInput = {[styles.all,styles.input,styles.regInput,styles.regInputLogUp]}
               onChangeText={(text) => onChange(text)}
               value={value}
               error={errors.email}
               errorText={errors?.email?.message}
             />
          )}
        />
      </View>
      <View style={[styles.inputGroup]}>
        <Controller
          name="tel"
          defaultValue=""
          control={control}
          rules={{
            pattern: {
              value: props.telReg,
              message: 'Некорректный номер телефона'
            }
          }}
          render={({ field: { onChange, value } }) => (
            <FormInput
                options={{
                  autoComplete:'tel',
                   placeholder:'Телефон',
                   onChangeText:(text) => onChange(text),
                   value:value
                }}
               styleInput = {[styles.all,styles.input,styles.regInput,styles.regInputLogUp]}
               onChangeText={(text) => onChange(text)}
               value={value}
               error={errors.tel}
               errorText={errors?.tel?.message}
             />
          )}
        />
        <Controller
          name="password"
          defaultValue=""
          control={control}
          rules={{
            required:true,
            pattern: {
              value: /[0-9a-zA-Z!@#$%^&*]{6,}/g,
              message: 'Используйте латиницу и цифры'
            }
          }}
          render={({ field: { onChange, value } }) => (
            <FormInput
                options={{
                  autoComplete:'password',
                   placeholder:'Пароль',
                   onChangeText:(text) => onChange(text),
                   value:value,
                }}
                secure ={ true}
               styleInput = {[styles.all,styles.input,styles.regInput,styles.regInputLogUp]}
               onChangeText={(text) => onChange(text)}
               value={value}
               name='password'
               error={errors.password}
               errorText={errors?.password?.message}
             />
          )}
        />
      </View>

      {/*<RadioForm
        formHorizontal={true}
        animation={true}
        style={[styles.checksWrap,styles.jc_sb,styles.fd_r]}
        >
          {radio_props.map((obj, i) => (
            <RadioButton labelHorizontal={true} key={i} style={[styles.checkWrap,styles.ai_c,styles.fd_r]}>
              <RadioButtonInput
                obj={obj}
                index={i}
                isSelected={designer == i}
                onPress={() => props.setDesigner(i)}
                borderWidth={1}
                buttonInnerColor={'#D25C5C'}
                buttonOuterColor={'#D25C5C'}
                buttonSize={fontSizeMain*0.75}
                buttonOuterSize={fontSizeMain*1.5}
                buttonStyle={{}}
              />
              <Text style={[styles.all,styles.checkText,styles.redColor]}>{obj.label}</Text>
            </RadioButton>
          ))
        }
      </RadioForm>*/}
      <Button onPress={handleSubmit((data) => props.submit(data,designer))} title="Зарегистрироваться" />
      <Text style={[styles.all,{fontSize:fontSizeMain*0.7,marginTop:fontSizeMain}]}>
        Предоставляя Ваши контактные данные, Вы соглашаететсь на обработку персональной информации в соотвествии с
        <Pressable onPress={()=>{props.navigation.navigate('Agreement')}}>
          <Text style={[styles.greenColor,{fontSize:fontSizeMain*0.8}]}> пользовательским соглашением</Text>
        </Pressable>
      </Text>
    </View>
  )
}
LogUp.navigationOptions = {
    title: 'LogUp'
};

let mapStoreToProps = (store) => ({
  repeatEmail:store.register.repeatEmail
})

export default connect(mapStoreToProps)(LogUp)
