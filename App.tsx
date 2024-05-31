import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
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
const [isLowercase,Lowercase] =useState(true)
const [isUppercase,setUppercase] =useState(false)
const [Numbers,useNumbers] =useState(false)
const [Symbols,useSymbols] =useState(false)

const generatePasswordString = (passwordLength: number) => {
    let characterList = ''
    const upperCaseCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowerCaseCharacters= 'abcdefghijklmnopqrstuvwxyz'
    const digitCharacters = '0123456789'
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

}

  return (

    <View>
      <Text>App</Text>
    </View>
  )
}

const styles = StyleSheet.create({})