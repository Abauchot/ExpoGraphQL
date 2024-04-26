import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList} from 'react-native-web';
import axios from 'axios';
import { useEffect, useState } from 'react';
import "../global.css";



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

const stats = [
  { id: 1, name: 'Transactions every 24 hours', value: '44 million' },
  { id: 2, name: 'Assets under holding', value: '$119 trillion' },
  { id: 3, name: 'New users annually', value: '46,000' },
]

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
      <div className="bg-black py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
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
