import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList} from 'react-native-web';
import axios from 'axios';
import { useEffect, useState } from 'react';



const getAllPlanets = () => {
  const url = 'https://graph.sprw.dev/api/graphql';
  return axios.get(url, {
    params: {
      query: `
        {
          planets {
            edges {
              node {
                name
                id
              }
            }
          }
        }
      `
    }
  });
}

export default function App() {
  const [planets, setPlanets] = useState([]);
  useEffect( () => {
    getAllPlanets()
    .then(response => {
      setPlanets(response.data.data.planets.edges);
    })
    .catch(error => {
      console.log('Error fecthing planets: ',error);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>List of planets:</Text>
      <FlatList
      data={planets}
      renderItem={({item}) => <Text>{item.node.name}</Text>}
      keyExtractor={item => item.node.id}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
