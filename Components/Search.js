import React, { useState, useEffect } from "react";
import {
    View,
    TextInput,
    Button,
    StyleSheet,
    FlatList,
    ActivityIndicator,
} from "react-native";
import FilmItem from "./FilmItem";
import { getFilmsFromApiWithSearchedText } from "../API/TMDBApi";
export default function Search(props) {
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
            setPage(1);
            setTotalPages(0);
            setFilms([]);
        }
        if (searchText.length > 0 && reset == false) {
            setIsLoading(true);
            console.log(searchText);
            getFilmsFromApiWithSearchedText(searchText, page).then(
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
    const displayDetailForFilm = (idFilm) => {
        console.log("Display film with id " + idFilm)
        props.navigation.navigate("FilmDetail", {idFilm: idFilm})
    };
    

    return (
        <View>
            <TextInput
                style={styles.textinput}
                placeholder="Titre du film"
                onChangeText={(text) => searchTextInputChanged(text)}

            />
            <Button title="Rechercher" onPress={() => loadFilms()} />
            <FlatList
                data={films}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <FilmItem film={item} displayDetailForFilm={displayDetailForFilm} />}
                onEndReachedThreshold={1}
                onEndReached={() => {
                    if (page <= totalPages) {
                        loadFilms();
                    }
                }}
            />
            {displayLoading()}
        </View>
    );
}
const styles = StyleSheet.create({
    textinput: {
        marginTop: 30,
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
