import { types } from "../types/types"

export const setErrorAction = (err) => {
    return {
        type: types.uiSetError,
        payload: err
    }
}

export const removeErrorAction = () => {
    return {
        type: types.uiRemoveError
    }
}

export const startLoadingAction = () => {
    return {
        type: types.uiStartLoading
    }
}

export const finishLoadingAction = () => {
    return {
        type: types.uiFinishLoading
    }
}