import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList } from 'react-native';

import FilmItem from './FilmItem';
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi';
export default function Search() {
    const [films, setFilms] = useState([])
    const [searchText, setSearchText] =useState([])
    const loadFilms = () => {
        if (searchText.length >0){
            getFilmsFromApiWithSearchedText(searchText).then(data => {
                setFilms(data.results);
    
            })
        }

    };
    const searchTextInputChanged = (text) => {
        setSearchText(text) ;
    }
    console.log("RENDER")
    return (
        <View style={styles.main_container}>
            <TextInput style={styles.textinput} placeholder='Titre du film' onChangeText={(text)=>searchTextInputChanged(text)}/>
            <Button title='Rechercher' onPress={() => loadFilms()} />
            <FlatList
                data={films}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <FilmItem film={item} />}
            />
        </View>
    )
}
const styles = StyleSheet.create({

    main_container: {

        marginTop: 20,

    }
})