import React, { useState } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import FilmItem from './FilmItem'
import { connect } from 'react-redux'

const FilmList = ({props, films, favoritesFilm, page, totalPages, loadFilms,navigation}) => {

    const displayDetailForFilm = (idFilm) => {
        console.log("Display film with id " + idFilm)
        navigation.navigate("FilmDetail", { idFilm: idFilm })
    };
    return (

        <FlatList
        style={styles.list}
            data={films}
            extraData={favoritesFilm}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) =>
                <FilmItem
                    film={item}
                    isFilmFavorite={(favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false}
                    displayDetailForFilm={displayDetailForFilm} />}
            onEndReachedThreshold={1}
            onEndReached={() => {
                if (page <= totalPages) {
                    loadFilms();
                }
            }}
        />
    )
}


const styles = StyleSheet.create({
    list: {
        flex: 1
    }
})

const mapStateToProps = state => {
    return {
        favoritesFilm: state.favoritesFilm
    }
}

export default connect(mapStateToProps)(FilmList)