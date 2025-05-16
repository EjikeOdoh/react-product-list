export default function cartReducer(state, action) {

    switch (action.type) {

        case 'add': {
            return state.map(x => {
                if (x.id === action.id) {
                    return { ...x, isSelected: true }
                } else {
                    return x
                }
            })
        }

        case 'increase': {
            return state.map(x => {
                if (x.id === action.id) {
                    return {...x, quantity:x.quantity+1}
                } else {
                    return x
                }
            })
        }

        case 'decrease': {
            return state.map(x => {
                if (x.id === action.id) {
                    if (x.quantity <= 1) {
                        return { ...x, isSelected: false }
                    } else {
                        return { ...x, quantity: x.quantity - 1 }
                    }
                } else {
                    return x
                }
            })
        }

        case 'remove': {
            return state.map(x => {
                if (x.id === action.id) {
                    return { ...x, isSelected: false, quantity: 1 }
                } else {
                    return x
                }
            })
        }

        default:
            {
                throw Error('Unknown action: ' + action.type);
            }
    }

}