import { COMMUNITY_LOADED, COMMUNITY_LOADING, GET_ALL_COMMUNITY_DATA } from "./community.constant"

const INITIAL_STATE = {
    communityLoading: false,
    allCommunityData: null,
}

const communityReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case COMMUNITY_LOADING:
            return { ...state, communityLoading: true }

        case COMMUNITY_LOADED:
            return { ...state, communityLoading: false }

        case GET_ALL_COMMUNITY_DATA:
            return { ...state, communityLoading: false, allCommunityData: action?.payload }

        default:
            return state;
    }
}
export default communityReducer;