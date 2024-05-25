import React, { useState, useRef } from 'react';
import { Text, StyleSheet, TextInput, ScrollView, Button } from 'react-native'
import 'react-native-get-random-values';
import * as Location from 'expo-location';
import MapView, { Polyline } from 'react-native-maps';
import * as tt from '@tomtom-international/web-sdk-services';
import { format } from 'date-fns';

const App = () => {
  const mapRef = useRef(null);
  const [result, setResult] = useState([]);
  const [coordinates, setCoordinates] = useState([]);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão de localização não concedida', 'Por favor, conceda permissão de localização para obter a localização.');
      return;
    }
    let locationData = await Location.getCurrentPositionAsync({});
    setOrigin(`${locationData.coords.latitude}, ${locationData.coords.longitude}`);
  };

  const calculateRoute = async () => {
    const key = 'Xvd2QCZpM8dRq7IyAzZZAqh9pxgtWPy7';

    if (origin && destination) {
        let originCoords;

        if (isCoordinates(origin)) {
            const [lat, lng] = origin.split(',').map(coord => parseFloat(coord.trim()));
            originCoords = { lat, lng };
        } else {
            const originResponse = await tt.services.geocode({ key, query: origin });
            originCoords = originResponse.results[0] ? originResponse.results[0].position : null;
        }
        
        const destinationResponse = await tt.services.geocode({ key, query: destination });
        const destinationCoords = destinationResponse.results[0] ? destinationResponse.results[0].position : null;
        
        if (originCoords && destinationCoords) {
            const result = await tt.services.calculateRoute({
                key,
                locations: [originCoords, destinationCoords],
            });
            setResult(result);

            if (result && result.routes && result.routes.length > 0) {
                const points = result.routes[0].legs[0].points;
                setCoordinates(points.map(point => ({ latitude: point.lat, longitude: point.lng })));
            }
        }
    }
};

function isCoordinates(str) {
    return str.includes(',') && str.split(',').length === 2;
}

  return (
    <ScrollView style={styles.container}>
      <Button title="Usar minha localização" onPress={getCurrentLocation} />
      <TextInput 
        style={{marginTop: 20, borderWidth: 1}}
        placeholder='Origem'
        onChangeText={text => setOrigin(text)}
        value={origin}
      />
      <Text>Se não for utilizar sua localização, adicione também o nome da cidade!</Text>
      <TextInput
        style={{marginTop: 20, borderWidth: 1}}
        placeholder='Destino'
        onChangeText={text => setDestination(text)}
        value={destination}
        />
    <Text style={{marginBottom: 20, }}>Obrigatório adicionar nome da cidade!</Text>
      <Button title="Calcular rota" onPress={calculateRoute} />
      <Text style={{}}>Partida: {result.routes && result.routes[0].summary.departureTime ? format(new Date(result.routes[0].summary.departureTime), 'dd/MM HH:mm') : ''}</Text>
      <Text style={{}}>Chegada: {result.routes && result.routes[0].summary.arrivalTime ? format(new Date(result.routes[0].summary.arrivalTime), 'dd/MM HH:mm') : ''}</Text>
      <MapView
        ref={mapRef}
        style={{ height: 400, marginVertical: 30 }}
        initialRegion={{
          latitude: -8.047129,
          longitude: -34.873668,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {coordinates.length > 0 && (
          <Polyline
            coordinates={coordinates}
            strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
            strokeWidth={6}
          />
        )}
      </MapView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    marginHorizontal: 40, 
    marginTop: 80, 
  }
});

export default App;
