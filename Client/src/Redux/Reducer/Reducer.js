import { Types } from '../Actions/Types'




export const Reducer = (state = { UserList: undefined, MessagesUser: undefined }, action) => {
    switch (action.type) {
        case Types.GET_USER_WHEN_CLICKED_ON_LIST:
            return {
                ...state,
                UserList: action.payload
            }

        case Types.GET_MESSAGES_USER_WHEN_CLICKET:
            return {
                ...state,
                MessagesUser: action.payload
            }

        default:
            return state
    }
}
