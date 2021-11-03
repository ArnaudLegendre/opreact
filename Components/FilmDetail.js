import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, Share, TouchableOpacity, Platform } from 'react-native'
import { getFilmDetailFromApi, getImageFromApi } from '../API/TMDBApi'
import moment from 'moment'
import numeral from 'numeral'
import { connect } from 'react-redux'
const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.favoritesFilm
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => { dispatch(action) }
    }
}


const FilmDetail = props => {

    const [film, setFilm] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        getFilmDetailFromApi(props.route.params.idFilm).then(data => {
            setFilm(data)
            setIsLoading(false)
        })
    }, [])
    const shareFilm = () => {
        const filmtoshare = film
        Share.share({ title: filmtoshare.title, message: filmtoshare.overview })
    }
    const displayFloating = () => {
        const filmtoshare  = film
        if (filmtoshare != undefined && Platform.OS === 'android') { // Uniquement sur Android et lorsque le film est chargé
            return (
                <TouchableOpacity
                    style={styles.share_touchable_floatingactionbutton}
                    onPress={() => shareFilm()}>
                    <Image
                        style={styles.share_image}
                        source={require('../images/ic-share.png')} />
                </TouchableOpacity>
            )
        }
    }
    const displayLoading = () => {
        if (isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size="large" />
                </View>
            );
        }
    };
    const toggleFavorite = () => {
        const action = { type: "TOGGLE_FAVORITE", value: film }
        props.dispatch(action)
    }
    const displayFavoriteImage = () => {
        var sourceImage = require('../images/ic-nofav.png')
        if (props.favoritesFilm.findIndex(item => item.id === film.id) !== -1) {

            sourceImage = require('../images/icfav.png')
        }
        return (
            <Image
                style={styles.favorite_image}
                source={sourceImage}
            />
        )
    }

    const displayFilm = () => {
        if (film) {
            return (
                <ScrollView style={styles.scrollview_container}>
                    <Image
                        style={styles.image}
                        source={{ uri: getImageFromApi(film.backdrop_path) }}
                    />
                    <Text style={styles.title}>{film.title}</Text>
                    <TouchableOpacity
                        style={styles.favorite_container}
                        onPress={() => toggleFavorite()}>
                        {displayFavoriteImage()}
                    </TouchableOpacity>

                    <Text style={styles.overview}>{film.overview}</Text>
                    <Text style={styles.default_text}>Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
                    <Text style={styles.default_text}>Note : {film.vote_average}/10</Text>
                    <Text style={styles.default_text}>Nombre de votes : {film.vote_count}</Text>
                    <Text style={styles.default_text}>Budget : {numeral(film.budget).format('0,0[.]00 $')}</Text>
                    <Text style={styles.default_text}>Genre(s) : {film.genres.map((genre) => {
                        return genre.name;
                    }).join(' / ')}</Text>
                    <Text style={styles.default_text}>Compagnie(s) : {film.production_companies.map((companie) => {
                        return companie.name;
                    }).join(' / ')}</Text>
                </ScrollView>
            )
        }

    };
    return (
        <View style={styles.main_container}>
            {displayFilm()}
            {displayLoading()}
            {displayFloating()}
        </View>
    );

}
const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        padding: 5
    },
    favorite_image: {
        width: 40,
        height: 40
    },
    favorite_container: {
        alignItems: 'center',

    },
    image: {
        height: 169,
        margin: 5
    },
    title: {
        textAlign: 'center',
        fontSize: 25
    },
    overview: {
        fontStyle: 'italic'
    },
    default_text: {
        color: '#323839',
        marginTop: 5
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
    scrollview_container: {
        flex: 1,
    },
    share_touchable_floatingactionbutton: {
        position: 'absolute',
        width: 60,
        height: 60,
        right: 30,
        bottom: 30,
        borderRadius: 30,
        backgroundColor: '#e91e63',
        justifyContent: 'center',
        alignItems: 'center'
    },
    share_image: {
        width: 30,
        height: 30
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(FilmDetail)
