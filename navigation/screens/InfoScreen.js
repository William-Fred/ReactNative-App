import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { ActivityIndicator, FlatList, Text, View,
         TextInput, Pressable, StyleSheet, Modal, TouchableOpacity } from 'react-native';

 const InfoScreen = ({navigation}) => {
    const apiKey = 'S2BJOY1UVBWYITJ13CYF'
    const [legends, setLegends] = useState([])
    const [brawlId, setBrawlId] = useState('')
    const [dataFilled,setDataFilled] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    
    const getBrawlStats = async () => {
        fetch(`https://api.brawlhalla.com/player/${brawlId}/stats?api_key=`+ apiKey)
        .then(response => response.json())
        .then(responseJson =>{
            console.log(responseJson)
            setLegends(responseJson)
            setDataFilled(true)
        })
        .catch((error) =>{
            console.log(error);
        })
     }

    //  useEffect(() => {
    //     getBrawlStats();
    //   }, []);
    

      //Handle input
      const handleChangeText = (value) =>{
        setBrawlId(value);
    }

    //Render when hit button
    const renderElement = () =>{
        if(dataFilled){
             return <View>
              <Text style={styles.response}>Name: {legends.name}</Text>
              <Text style={styles.response}>Games: {legends.games}</Text>
              <Text style={styles.response}>wins: {legends.wins}</Text>
              <Text style={styles.response}>Level: {legends.level}</Text>
              <Text style={styles.response}>XP: {legends.xp}</Text>
              <Modal
               animationType="slide"
               visible= {modalVisible}
               onRequestClose={() =>{
                   Alert.alert("Modal closed");
                   this.setModalVisible(!modalVisible);
               }}>
                   <View style={{
                       flex:1,
                       flexDirection: 'column',
                       justifyContent: 'center',
                       alignItems: 'center'
                   }}>
                       <View style={{ 
                            width: 300,
                            height: 600
                       }}>
                           <Pressable onPress={() => setModalVisible(!modalVisible)}>
                               <Text>Close</Text>
                           </Pressable>
                           <Pressable
                           onPress={() => setModalVisible(!modalVisible)}>
                                 <FlatList
                                    data={legends.legends}
                                    keyExtractor={({ id }, index) => id}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                        onPress={() => navigation.navigate('LegendDetails',{legends:item}, setModalVisible(!modalVisible))}>
                                        <Text>{item.legend_name_key}, {item.damagedealt}</Text>
                                     </TouchableOpacity>
                                    )}
                                    ></FlatList>
                                    
                           </Pressable>
                       </View>
                   </View>
               </Modal>
               <Pressable 
               style={styles.button}
               onPress={() => setModalVisible(true)}>
                   <Text style={styles.response}>Legends</Text>
               </Pressable>
            </View>
        }
     }


        return(
            <View style={{ width:'80%'}}>
            <View style={{ justifyContent: 'center', alignItems: 'center'}}>
                 <Text style={{fontSize: 20}}>Type in your brawlhalla id</Text>
                <TextInput style={styles.input}
                placeholder="brawlhalla id"
                onChangeText={handleChangeText}
                value={brawlId}>
                </TextInput>
                <View>
                <Pressable
                style={[styles.button]}
                onPress={getBrawlStats}>
                    <Text style={ styles.buttonText}>Get brawl stats</Text>
                </Pressable>
                </View>
                    <View style={styles.apiView}>
                        {renderElement() }
                    </View>
                <View>
            </View>
         </View>
            
         </View>
        )

      }

 const styles = StyleSheet.create({

    apiContainer:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    apiView:{
        backgroundColor: 'black',
        height: '50%',
        width: '100%',
        borderColor: 'white',
        borderWidth: 3,
        borderTopWidth: 3,
        
    },
    apiTextView: {
        alignItems: 'center',
        justifyContent: 'center',

    },
    apiText: {
        color: 'white',
        fontSize: 16
    },
    input:{
        width: '100%',
        borderColor: 'black',
        borderWidth: 3,
        borderRadius: 10,
        padding: 10
    }, 
    response:{
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    },
    button:{
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: "#2196F3",
    },
    buttonText: {
        color: 'white',
        fontSize: 20
    }
})

export default InfoScreen;