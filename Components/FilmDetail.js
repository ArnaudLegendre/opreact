import React,{ useState} from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'
export default function FilmDetail() {
    const [film, setFilm] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
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
        <View style={styles.main_container}>
            {displayLoading}
        </View>
    )

}
const styles = StyleSheet.create({
    main_container: {
        flex: 1,
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
})

