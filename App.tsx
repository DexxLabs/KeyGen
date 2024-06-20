import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TextInputComponent, TouchableOpacity, View, useColorScheme } from 'react-native'
import React, { useState } from 'react'
import { Formik } from 'formik'
import Header from './assets/Header'
import Form from './assets/Form'
import BouncyCheckbox from "react-native-bouncy-checkbox";

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

const resetPassword = () => {
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
         <View >
            <View style={styles.inputfield} >
            <Text style={mode?styles.instruction : styles.instructionLight}>Password Length</Text>
              <TextInput style={mode?styles.inputstyle : styles.inputstyleLight}
               value={values.PasswordLength} 
               onChangeText={handleChange('PasswordLength') } 
               placeholder='Enter a value' 
               placeholderTextColor={mode?"grey": 'black'} // Change this to the color you want
               
               keyboardType= 'numeric' />
              
            </View>
               {touched.PasswordLength && errors.PasswordLength && (
                 <Text style={styles.errorMessage}>{errors.PasswordLength}</Text>
               )}
         </View>
         <View style={styles.inputcontainer}>
          <Text style={mode?styles.instruction : styles.instructionLight}>Include Lowercase</Text>
          <BouncyCheckbox 
          fillColor="#75DA8B"
          isChecked={isLowercase}
          onPress={() => setLowercase(!isLowercase)}/>
         </View>

         <View style={styles.inputcontainer}>
         <Text style={mode?styles.instruction : styles.instructionLight}>Include Uppercase</Text>
          <BouncyCheckbox 
          fillColor="#01CBC6"

          isChecked={isUppercase}
          onPress={() => setUppercase(!isUppercase)}/>                     
         </View>

         <View style={styles.inputcontainer}>
         <Text style={mode?styles.instruction : styles.instructionLight}>Include Numbers</Text>
          <BouncyCheckbox 
          fillColor="#8B78E6"
          isChecked={Numbers}
          onPress={() => setNumbers(!Numbers)}/>
         </View>

         <View style={styles.inputcontainer}>
         <Text style={mode?styles.instruction : styles.instructionLight}>Include Symbols</Text>
          <BouncyCheckbox 
          fillColor="#FF7F3E"
          isChecked={Symbols}
          onPress={() => setSymbols(!Symbols)}/>
         </View>


         
         <View style={styles.formbuttons}>
          <TouchableOpacity
          disabled={!isValid}
          onPress={handleSubmit}
          >
            <Text style={mode?styles.buttons : styles.buttonsLight}>Generate Password</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          onPress={ () => {handleReset();
          resetPassword()}}>
            <Text style={mode?styles.buttons : styles.buttonsLight}>Reset Password</Text>
          </TouchableOpacity>

         </View> 

         </>
       )}
     </Formik>
     
     {isPasswordGenerated ? (
      <View>
        <View style={mode?styles.card : styles.cardLight}>
      <View>
        <Text style={mode? styles.passwordText : styles.passwordTextLight} selectable={true}>{password}</Text>
      </View>
      <View>
        <Text style={mode? styles.description : styles.descriptionLight}>Long Press to Copy</Text>
      </View>

     </View>
      </View>
     ) : null }

     

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
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    
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
  marginBottom: 15,
  justifyContent: 'space-evenly'
},
inputstyle:{
  borderColor: '#fff',
    borderWidth: 2,
    flex:1,
    borderRadius: 20,
    marginRight :12
    
},
inputstyleLight:{
  borderColor: '#000',
    borderWidth: 2,
    flex:1,
    borderRadius: 20,
    margin :12
},
instruction:{
  padding: 12,
  color: '#fff',
  fontWeight : 'bold'
},
instructionLight:{
  padding: 12,
  color: '#000',
  fontWeight : 'bold'
},
errorMessage:{  
  color: '#ff0000',
  flexDirection: 'row',
  textAlign : 'center'
},


card:{
  backgroundColor: '#fff',
  height: 125,
  borderRadius: 20,
  margin: 12,
  alignItems: 'center',
    justifyContent: 'center'
},
cardLight:{
  backgroundColor: '#000',
  height: 125,
  borderRadius: 20,
  margin: 12,
  alignItems: 'center',
    justifyContent: 'center'
},
passwordText:{
  color: '#000',
  fontWeight:'bold',
  fontSize: 30,
},
passwordTextLight:{
  color: '#fff',
  fontWeight:'bold',
  fontSize: 30,
},
description :{
  color: '#000',
  
},
descriptionLight :{
  color: '#fff',
  
},

})