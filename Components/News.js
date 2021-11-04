import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import FilmList from './FilmList'

import { getNewFilmFromApi } from '../API/TMDBApi'

const News = ({ navigation, }) => {

    const [films, setFilms] = useState([])
    const [page, setPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        loadFilms(true);
    }, [])

    const loadFilms = (reset=false) => {
        
        console.log('loadfilms')
        setLoading(true)
        getNewFilmFromApi(page+1).then((data) => {
            console.log('loadfilms')
            setPage(data.page)
            console.log(page)
            setTotalPages(data.total_pages)
            setFilms([...films, ...data.results])
            setLoading(false)
        })
    }
    return (
        
            <FilmList style={styles.list}
                films={films}
                navigation={navigation}
                loadFilms={loadFilms}
                page={page}
                totalPages={totalPages}
                favoritesList={false}
            />
        


    )
}
const styles = StyleSheet.create({
    list: {
        flex: 1
    }
})


export default News