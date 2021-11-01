import React, { useState} from 'react'
import { StyleSheet, FlatList } from 'react-native'
import FilmItem from './FilmItem'
import { connect } from 'react-redux'

const FilmList = props => {
    const [film, setFilm] = useState(undefined);

    const displayDetailForFilm = (idFilm) => {
        console.log("Display film with id " + idFilm)
        props.navigation.navigate("FilmDetail", { idFilm: idFilm })
    };
    return (
        <FlatList
            style={styles.list}
            data={film}
            extraData={props.favoritesFilm}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <FilmItem
                    film={item}
                    isFilmFavorite={(props.favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false}
                    displayDetailForFilm={displayDetailForFilm}
                />
            )}
            onEndReachedThreshold={0.5}
            onEndReached={() => {
                if (this.props.page < this.props.totalPages) {
                    // On appelle la méthode loadFilm du component Search pour charger plus de films
                    this.props.loadFilms()
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