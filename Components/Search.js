import React, { useState, useEffect } from "react";
import {View,TextInput,Button,StyleSheet,ActivityIndicator} from "react-native";
import FilmList from "./FilmList";
import { getFilmsFromApiWithSearchedText } from "../API/TMDBApi";
import { connect } from "react-redux";
const mapStateToProps = state => {
    return {
        favoritesFilm: state.favoritesFilm
    }
}
const Search = props => {
    const [films, setFilms] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    useEffect(() => {
        loadFilms(true);
    }, [searchText])

    const loadFilms = (reset = false) => {
        if (reset) {
            setPage(0);
            setTotalPages(0);
            setFilms([]);
        }
        if (searchText.length > 0 && reset == false) {
            setIsLoading(true);

            getFilmsFromApiWithSearchedText(searchText, page+1).then(
                (data) => {
                    setPage(data.page);
                    
                    setTotalPages(data.total_pages);
                    
                    setFilms([...films, ...data.results]);
                    
                    setIsLoading(false);
                    setPage(page + 1);
                }
            );
        }
    };
    const searchTextInputChanged = (text) => {
        setSearchText(text);
    };
    const displayLoading = () => {
        if (isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size="large" />
                </View>
            );
        }
    };

    return (
        <View style={styles.container}> 
            <TextInput
                style={styles.textinput}
                placeholder="Titre du film"
                onChangeText={(text) => searchTextInputChanged(text)}

            />
            <Button title="Rechercher" onPress={() => loadFilms()} />
            <FilmList
                films={films}
                navigation={props.navigation}
                loadFilms={loadFilms}
                page={page}
                totalPages={totalPages}
                favoriteList={false}
                />
            {displayLoading()}
        </View>
    );
}
export default connect(mapStateToProps)(Search)
const styles = StyleSheet.create({
    textinput: {
        marginTop: 30,
    },
    container: {
        flex:1
    },
    loading_container: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center",
    },
});
