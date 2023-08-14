import {KEY} from 'constants/Loc-stor-key-constant'


export const loadState = () => {
    try {
        const serializedState = localStorage.getItem(KEY.statusPacks)
        if (serializedState === null) {
            return undefined
        }
        return serializedState
    } catch (err) {
        return undefined
    }
}


export const saveState = (statusPackCards: string) => {
    try {
        localStorage.setItem(KEY.statusPacks, statusPackCards)
    } catch {
        // ignore write errors
    }
}