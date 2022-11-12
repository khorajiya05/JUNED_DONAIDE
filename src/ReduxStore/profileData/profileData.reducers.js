import { GET_PROFILE_DATA, PROFILE_DATA_LOADED, PROFILE_DATA_LOADING, UPDATE_PROFILE_DATA } from "./profileData.constant"

const INITIAL_STATE = {
    loading: false,
    profileData: {},
}

const profileDataReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PROFILE_DATA_LOADING:
            return { ...state, loading: true }

        case PROFILE_DATA_LOADED:
            return { ...state, loading: false }

        case GET_PROFILE_DATA:
            return { ...state, loading: false, profileData: action?.payload }

        case UPDATE_PROFILE_DATA:
            return { ...state, loading: false, profileData: action.payload?.data }

        default:
            return state;
    }
}
export default profileDataReducer;