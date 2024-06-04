import { StyleSheet, Text, View, useColorScheme } from 'react-native'
import React from 'react'


export default function Keygen() {
  const mode = useColorScheme() === 'dark'
  return (
    <View>
    <View style={styles.headercontainer}>
      <Text style= {mode?styles.headertext : styles.headertextLight}>Keygen</Text>
    </View>
    
    </View>
  )
}

const styles = StyleSheet.create({
    headercontainer :{
        flex :1,
        flexDirection: 'row',
        justifyContent: 'center',
        margin:14,
        paddingBottom: 20
        
    },
    headercontainerLight :{
      flex :1,
      flexDirection: 'row',
      justifyContent: 'center',
      margin:14,
      paddingBottom: 20
      
  },
    headertext: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#ffffff'
    },
    headertextLight:{
      fontSize: 22,
        fontWeight: 'bold',
        color: '#000'
    },
    box: {
        height: 100,
        backgroundColor: '#ffffff',
        margin:12,
        borderRadius: 30
    }
})