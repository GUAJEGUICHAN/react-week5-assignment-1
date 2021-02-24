import { GET_REGIONS_SUCCESS, WATCH_THE_REGION } from './actions';

const initialState = {
  regions: [],
  categories: [],
  restaurants: [],
  error: { regions: null, categories: null, restaurants: null },
};

const actionHandler = {

  [GET_REGIONS_SUCCESS](state, action) {
    const regions = action.payload.map((region) => ({ ...region, clicked: false }));
    return { ...state, regions };
  },

  [WATCH_THE_REGION](state, action) {
    const id = action.payload;
    const regions = state.regions.map((region) => (region.id === id ? { ...region, clicked: true } : { ...region, clicked: false }));
    return { ...state, regions };
  },
};

export default function reducer(state = initialState, action = { type: undefined }) {
  return actionHandler[action.type] ? actionHandler[action.type](state, action) : state;
}
