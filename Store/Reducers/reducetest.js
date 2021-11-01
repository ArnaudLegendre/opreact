const initialState = {
    historicFilms: []
}

function manageHistoricFilms(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'TOGGLE_FILMDETAIL':
            const historicFilmsIndex = state.historicFilms.findIndex(item => item.id === action.value.id)
            if (historicFilmsIndex !== -1) {
                nextState = {
                    ...state
                }
            }
            else {
                nextState = {
                    ...state,
                    historicFilms: [...state.historicFilms, action.value]
                }
            }
            return nextState || state
        case 'REMOVE_HISTORIC_FILM':
            const deleteFilmsIndex = state.historicFilms.findIndex(item => item.id === action.value.id)
            if (deleteFilmsIndex !== -1) {
                nextState = {
                    ...state,
                    historicFilms: state.historicFilms.filter((item, index) => index !== deleteFilmsIndex)
                }
            }
            return nextState || state
        case 'RESET_HISTORIC':
            nextState ={
                historicFilms:[]
            }
            return nextState
    }
    return state
}

export default manageHistoricFilms
