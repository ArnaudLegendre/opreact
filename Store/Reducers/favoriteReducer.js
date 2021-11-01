const initialState = {favoritesFilm: []}

function toggleFavorite(state = initialState, action){
    let nextState 
    switch(action.type){
        case 'TOGGLE_FAVORITE':
            const favoriteFilmindex = state.favoritesFilm.findIndex(item => item.id === action.value.id);
            if(favoriteFilmindex !== -1){
                nextState ={
                    ...state,
                    favoritesFilm: state.favoritesFilm.filter((item,index) => index !== favoriteFilmindex)
                }
            }
            else{
                nextState ={
                    ...state,
                    favoritesFilm: [...state.favoritesFilm, action.value]
                }
            }
            return nextState || state
        default:
            return state
    }
}
export default toggleFavorite