import React from 'react';
import { View, Text, Button} from 'react-native';

function legendDetails({route, navigation}){
    const {legends} = route.params

    return(
        <View>
            <Text>Legend details</Text>
            <Text>{legends.legend_name_key}, {legends.damagedealt}</Text>
        </View>
    )
}
export default legendDetails;