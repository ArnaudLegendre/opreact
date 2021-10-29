import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
export default function FilmDetail(props) {
    console.log(props.navigation)
    return (
        <View style={styles.main_container}>
            <Text>Détail du film{props.navigation.getParam('idFilm')}</Text>
        </View>
    )

}
const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    }
})
