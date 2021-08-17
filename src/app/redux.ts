interface Action {
    type: string;
    payload: any;
}

export class ActionTypes {
    public static CHANGE_UI_SETTINGS: string = 'CHANGE_UI_SETTINGS';
}

const initialUiState = {
    'BookingListComponent': {
        sortProp: 'startDate',
        sortOrder: 'asc'
    }
};

export function uiStateReducer(state: any = initialUiState, action: Action) {
    switch (action.type) {
        case ActionTypes.CHANGE_UI_SETTINGS:
            return {...state, [action.payload.componentName]: action.payload.settings};
    }
    return state;
}