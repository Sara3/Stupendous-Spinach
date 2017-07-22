import store from '../store';
//import watch from 'redux-watch';

export default function photoArray(state = [], action) {
  switch (action.type) {
  case 'ALL_PHOTOS':
    return action.payload;
  case 'INCREMENT_LIKES':
    const i = action.index;
      return [
        ...state.slice(0, i),
        {
          ...state[i], like_count: state[i].like_count === null ? state[i].like_count = 1 : state[i].like_count + 1
        },
        ...state.slice(i + 1),
      ]
  default:
    return state;
  }
}
// console.log('store ', store);
// let w = watch(store.getState, 'photoArray');
// store.subscribe(w((newVal, oldVal, objectPath) => {
//   console.log('%s changed from %s to %s', objectPath, oldVal, newVal);
// }))