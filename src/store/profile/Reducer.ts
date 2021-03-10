import { Reducer } from 'redux'
import { ProfileActionTypes, ProfileState } from './Types'

export const initialState: ProfileState = {
    items: {},
    loading: false,
    isAuthenticated: null,
    schoolId:'',
    profileData:[]
}

const reducer: Reducer<ProfileState> = (state = initialState, action) => {
    switch (action.type) {
        case ProfileActionTypes.FETCH_PROFILE:
        case ProfileActionTypes.TOKEN_VALIDATION_REQUEST:
            return { ...state, loading: true };
    
        case ProfileActionTypes.FETCH_PROFILE_FAIL:
        case ProfileActionTypes.TOKEN_VALIDATION_ERROR:
                return { ...state, loading: false,
                    isAuthenticated: true }; 
        
        case ProfileActionTypes.FETCH_PROFILE_SUCCESS:
            const { schoolId, profileData } = action
                return {
                    ...state, 
                    loading: false, 
                    items: action.payload,
                    isAuthenticated: false,
                    schoolId:schoolId,
                    profileData: profileData
                };
            default:
                return state;
    }
}

export { reducer as ProfileReducer }