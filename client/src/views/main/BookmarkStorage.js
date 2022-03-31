import React, {useState} from "react";
import { View, Modal, Button, NativeBaseProvider, Text, Link, Box, Spacer,  HStack } from 'native-base';
import { Alert, FlatList } from 'react-native';
import axios from 'axios';
const IP_address = process.env.IP_address

export default function BookmarkStorage() {
    const [dataArr, setDataArr] = useState('');
    const callback = (data) => {
        setDataArr(data);
    }

    axios.get('http://'+IP_address+':5000/bookmarkRouter/find')
    .then((response) => {
        callback(response.data);
    }).catch(function (error) {
      console.log(error);
    });

    let bmSArr = Object.values(dataArr).map(bmS => bmS);

    return(
        <NativeBaseProvider>
<View >
      <FlatList data={bmSArr} renderItem={({
      item
    }) => <Link href="#">
      <Box borderBottomWidth="1" _dark={{
      borderColor: "gray.600"
    }} borderColor="coolGray.200" py="2" >
            <HStack space={3} justifyContent="space-between">
                <Text numberOfLines={1} ellipsizeMode='tail' _dark={{
            color: "warmGray.50"
          }} color="coolGray.800" bold >
                  {item.bookmark_name}
                </Text>
              <Spacer />
            </HStack>
          </Box></Link>}  />
    </View>
        </NativeBaseProvider>
    )
} 