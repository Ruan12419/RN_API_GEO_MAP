/*import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, Image } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
const App = () => {
const [movieTitle, setMovieTitle] = useState('');
const [movieData, setMovieData] = useState(null);
const [location, setLocation] = useState(null);
useEffect(() => {
(async () => {
let { status } = await Location.requestForegroundPermissionsAsync();
if (status !== 'granted') {
Alert.alert('Permissão de localização não concedida', 'Por favor, conceda permissão de localização para obter a localização.');
return;
}
let locationData = await Location.getCurrentPositionAsync({});
setLocation(locationData);
})();
}, []);
const handleSearch = async () => {
if (movieTitle.trim() === '') {
Alert.alert('Aviso', 'Por favor, insira um título de filme válido.');
return;
}
try {
const apiKey = 'df537ec2'; // Substitua pelo seu próprio API Key
const apiUrl = `https://www.omdbapi.com/?t=${movieTitle}&apikey=${apiKey}`;
const response = await fetch(apiUrl);
const data = await response.json();
if (data.Response === 'True') {
setMovieData(data);
} else {
Alert.alert('Erro', 'Filme não encontrado. Verifique o título e tente novamente.');
}
} catch (error) {
console.error(error);
Alert.alert('Erro', 'Houve um problema na busca do filme. Tente novamente mais tarde.');
}
};
return (
<View>
<Text style={{ fontSize: 20, textAlign: 'center', marginTop: 50 }}>
Busca de Filmes
</Text>
<TextInput
style={{ borderWidth: 1, margin: 10, padding: 8, }}
placeholder="Digite o nome do filme"
value={movieTitle}
onChangeText={(text) => setMovieTitle(text)}
/>
<Button 
title="Buscar Filme" 
onPress={handleSearch} />
{location && (
<View style={{padding: 30, }}>
<Text style={{ fontSize: 22, fontWeight: 'bold' }}>Sua Localização</Text>
<Text style={{ fontSize: 18, }} >Latitude: Em casa {location.coords.latitude + 48.8942}</Text>
<Text style={{ fontSize: 18, }} >Longitude: Na cama 🥱🥱🥱{location.coords.longitude - 39.0239}</Text>
<Image 
source={{uri: "https://linda.nyc3.cdn.digitaloceanspaces.com/370_npd_webp-m_45/sticker-fan_6201828_m.webp"}}
style={{width: 140, height: 140, marginLeft: 100, marginVertical: 20, }}></Image>
<MapView
style={{ width: '100%', height: 200 }}
initialRegion={{
latitude: location.coords.latitude + 48.8942,
longitude: location.coords.longitude - 39.0239,
latitudeDelta: 0.0922,
longitudeDelta: 0.0421,
}}
>
<Marker
coordinate={{
latitude: location.coords.latitude + 48.8942,
longitude: location.coords.longitude - 39.0239,
}}
title="Sua Localização"
/>
</MapView>
</View>
)}
{movieData && (
<View style={{ margin: 20 }}>
<Text style={{ fontSize: 18, fontWeight: 'bold' }}>{movieData.Title}</Text>
<Text>Ano: {movieData.Year}</Text>
<Text>Gênero: {movieData.Genre}</Text>
<Text>Diretor: {movieData.Director}</Text>
<Text>Prêmios: {movieData.Awards}</Text>
</View>
)}
</View>
);
};
export default App;*/