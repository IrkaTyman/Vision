import React from 'react'
import {Button} from '../Button'
import {FormInput} from '../FormInput'
import {connect} from 'react-redux'
import {View} from 'react-native';
import {styles} from '../Style'
import { useForm, Controller } from "react-hook-form";

export const LogIn = (props) => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const incorEmailOrPass = props.incorEmailOrPass
  return(
    <View style={[styles.regPage,styles.ai_c,styles.jc_c]}>
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
             label={incorEmailOrPass ? "Неверная почта или пароль" : ''}
             styleLabel={[styles.repeatEmail]}
             styleInput = {[styles.all,styles.input,styles.regInput]}
             onChangeText={(text) => onChange(text)}
             value={value}
             error={errors.email}
             errorText={errors?.email?.message}
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
              value: /[0-9a-zA-Z!@#$%^&*]{5,}/g,
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
                   secureTextEntry:true
                }}
               styleInput = {[styles.all,styles.input,styles.regInput]}
               onChangeText={(text) => onChange(text)}
               value={value}
               name='password'
               error={errors.password}
               errorText={errors?.password?.message}
             />
          )}
        />
      <Button onPress={handleSubmit(data => props.submit(data))} title="Войти" />
    </View>
  )
}
let mapStoreToProps = (store) => ({
  incorEmailOrPass:store.register.incorEmailOrPass
})
export default connect(mapStoreToProps)(LogIn)
