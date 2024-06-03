import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TextInputComponent, TouchableOpacity, View, useColorScheme } from 'react-native'
import React, { useState } from 'react'
import { Formik } from 'formik'
import Header from './assets/Header'
import Form from './assets/Form'
//Form Validation
import * as Yup from 'yup'
export default function App() {
  const PasswordSchema = Yup.object().shape({
    PasswordLength: Yup.number()
    .min (4,"Should be minimum 4 characters")
    .max (16,"Shouldnt be more than 16 characters")
    .required("Should must be filled")
  })

const [password, setPassword] = useState('')
const [isPasswordGenerated , setisPasswordGenerated] = useState(false)
const [isLowercase,setLowercase] =useState(true)
const [isUppercase,setUppercase] =useState(false)
const [Numbers,setNumbers] =useState(false)
const [Symbols,setSymbols] =useState(false)

const generatePasswordString = (passwordLength: number) => {
    let characterList = ''
    const upperCaseCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowerCaseCharacters= 'abcdefghijklmnopqrstuvwxyz'
    const digitCharacters = '0123456789'
    const symbolCharacters = '!@#$%^&*'

    if (isLowercase) {
      characterList+=lowerCaseCharacters
    }
    if (isUppercase) {
      characterList+=upperCaseCharacters
    }
    if (Symbols) {
      characterList+=symbolCharacters
    }
    if (Numbers) {
      characterList+=digitCharacters
    }

    const passwordResult = createPassword(characterList, passwordLength)
    setPassword(passwordResult)
    setisPasswordGenerated(true)
}

const createPassword = (characters: string,passwordLength: number) => {
    let result = ''
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random()*characters.length)
      result += characters.charAt(characterIndex)
    }
    return result
  } 

const resetPassword = (characters: string) => {
    setPassword("")
    setisPasswordGenerated(false)
    setLowercase(true)
    setNumbers(false)
    setUppercase(false)
    setSymbols(false)
} 
const mode = useColorScheme() === 'dark'
  return (
    <SafeAreaView style={mode?styles.backgroundDark : styles.background}>
    <StatusBar backgroundColor={mode?'#141414' : '#ffffff'}/>
    <ScrollView showsVerticalScrollIndicator={false}>
    <Header/>
    
    <Formik
       initialValues={{ PasswordLength: '' }}
       validationSchema={PasswordSchema}
       onSubmit={ values => {
        console.log(values);
        generatePasswordString(+values.PasswordLength)
       }}
     >
       {({
         values,
         errors,
         touched,
         handleChange,
         isValid,
         handleSubmit,
         isSubmitting,
         handleReset
         /* and other goodies */
       }) => (
         <>
         <View style={styles.inputcontainer}>
            <View style={styles.inputfield} >
            <Text style={mode?styles.instruction : styles.instructionLight}>Password Length :</Text>
              <TextInput style={mode?styles.inputstyle : styles.inputstyleLight}
               value={values.PasswordLength} 
               onChangeText={handleChange('PasswordLength') } 
               placeholder='   Enter a value' 
               keyboardType='numeric' />
              
            </View>
         </View>
         <View style={styles.inputcontainer}></View>
         <View style={styles.inputcontainer}></View>
         <View style={styles.inputcontainer}></View>
         <View style={styles.inputcontainer}></View>

         
         <View style={styles.formbuttons}>
          <TouchableOpacity >
            <Text style={mode?styles.buttons : styles.buttonsLight}>Reset Password</Text>
          </TouchableOpacity>
          <TouchableOpacity >
            <Text style={mode?styles.buttons : styles.buttonsLight}>Generate Password</Text>
          </TouchableOpacity>

         </View>

         </>
       )}
     </Formik>
    </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  backgroundDark:{
    backgroundColor:'#141414',
    flex:1
  },
  background:{
    backgroundColor: '#FFFFFF',
    flex:1
  },

  inputcontainer:{
    
  }
,
formbuttons:{
  flexDirection: 'row',
  justifyContent: "space-evenly",
  padding: 20
},
buttons:{
  color: "#000",
  backgroundColor: '#fff',
  width : 150,
  height: 40,
  textAlign: 'center',
  textAlignVertical: 'center',
  borderRadius: 50,
  fontWeight: 'bold'
},
buttonsLight:{
  color: "#fff",
  backgroundColor: '#000',
  width : 150,
  height: 40,
  textAlign: 'center',
  textAlignVertical: 'center',
  borderRadius: 50,
  fontWeight: 'bold'
},
inputfield:{
  flexDirection: 'row',
  alignItems: 'center',
  margin :12
},
inputstyle:{
  borderColor: '#fff',
    borderWidth: 2,
    flex:1,
    borderRadius: 20
},
inputstyleLight:{
  borderColor: '#000',
    borderWidth: 2,
    flex:1,
    borderRadius: 20
},
instruction:{
  paddingRight: 12,
  color: '#fff'
},
instructionLight:{
  paddingRight: 12,
  color: '#000'
},

})