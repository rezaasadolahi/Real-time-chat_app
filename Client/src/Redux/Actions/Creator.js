import { Types } from './Types'




export const getUserWhenCliked = (value) => {
    return {
        type: Types.GET_USER_WHEN_CLICKED_ON_LIST,
        payload: value
    }
}


export const getMessagesUserWhenCliket = (value) => {
    return {
        type: Types.GET_MESSAGES_USER_WHEN_CLICKET,
        payload: value
    }
}