import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import FilmItem from './FilmItem';
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi';
export default function Search() {
    const [films, setFilms] = useState([])
    const [searchText, setSearchText] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    let [page, setPage] = useState(0)

    let totalPages = 0;
    const loadFilms = () => {
        if (searchText.length > 0) {
            setIsLoading(true)
            getFilmsFromApiWithSearchedText(searchText, page).then(data => {
                setPage(data.page);
                totalPages = data.total_pages;
                setFilms([...films, ...data.results]);
                setIsLoading(false)
            })
        }
    };
    const searchTextInputChanged = (text) => {
        setSearchText(text);
    }
    const displayLoading = () => {
        if (isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }

    return (
        <View style={styles.main_container}>
            <TextInput
                style={styles.textinput}
                placeholder='Titre du film'
                onChangeText={(text) => searchTextInputChanged(text)}
                onSubmitEditing={() => loadFilms()}
            />
            <Button title='Rechercher' onPress={() => loadFilms()} />
            <FlatList
                data={films}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <FilmItem film={item} />}
                onEndReachedThreshold={0.5}
                onEndReached={() => {
                    console.log('reach')
                    if (page <= totalPages) {
                        console.log('conditon ok')
                        loadFilms();

                    }
                }}
            />
            {displayLoading()}
        </View>
    )
}
const styles = StyleSheet.create({
    textinput: {
        marginTop: 30
    },
    main_container: {

        marginTop: 20,

    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})