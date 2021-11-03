import React from 'react'
import { StyleSheet} from 'react-native'
import FilmList from './FilmList'
import {connect} from 'react-redux'

const Favorites = ({favoritesFilm, navigation}) => {
    return (
        <FilmList
        films={favoritesFilm}
        navigation={navigation}
        favoritesList={true}
        />
    )
}
const styles = StyleSheet.create({

})
const mapStateToProps = state => {
    return {
        favoritesFilm: state.favoritesFilm
    }
}

export default connect(mapStateToProps)(Favorites)