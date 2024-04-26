import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native-web';
import axios from 'axios';
import { useEffect, useState } from 'react';



getAllPlanets = () => {
  const url = 'https://graph.sprw.dev/api/graphql';
  if(!url) {
    console.log('Please provide the GRAPHQL_URL');
    return Promise.reject(new Error('Please provide the GRAPHQL_URL'));
  }
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
      <Text>List of planets:aaaa</Text>
      {planets.map(planet => (
        <Text key={planet.node.id}>{planet.node.name}</Text>
      ))}
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
