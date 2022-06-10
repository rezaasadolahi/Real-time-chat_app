import { legacy_createStore } from 'redux'
import RootReducer from './Reducer/RootReducer'



export default legacy_createStore(RootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())