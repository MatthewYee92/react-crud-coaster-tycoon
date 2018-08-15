import {
  FETCH_ALL_PARKS,
  SELECT_PARK,
  UNSELECT_PARK
} from '../actions/parks'

const initialParks = { all: [], selected: { rides: [] } }
function parks (state=initialParks, { type, payload }) {
  switch (type) {
    case FETCH_ALL_PARKS:
      return { ...state, all: payload }
    case SELECT_PARK:
      return { ...state, selected: { ...payload } }
    case UNSELECT_PARK:
      return { ...state, selected: { rides: [] } }
    default:
      return state
  }
}

export default parks
