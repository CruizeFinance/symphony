import { Action, Actions }  from "./Action";
import State from "./StateModel";

const reducer = (state: State, action: Action): State => {
    switch(action.type) {
        case Actions.STORE_ASSET_PRICE:
            return {
                ...state,
                assetPrice: action.payload
            }
        case Actions.STORE_SELECTED_ASSET:
            return {
                ...state,
                selectedAsset: action.payload
            }
        case Actions.STORE_PRICE_FLOOR:
            return {
                ...state,
                priceFloor: action.payload
            }
        default:
            return state
    }
}

export default reducer;
