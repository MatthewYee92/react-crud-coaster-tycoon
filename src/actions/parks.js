import Park from '../models/Park'

export const FETCH_ALL_PARKS = 'FETCH_ALL_PARKS'
export const getAllParks = () => {
  return async (dispatch) => {
    const parks = await Park.all()
    dispatch({
      type: FETCH_ALL_PARKS,
      payload: parks
    })
  }
}

export const SELECT_PARK = 'SELECT_PARK'
export const selectPark = (id) => {
  return async (dispatch) => {
    const park = await Park.find(id)
    dispatch({
      type: SELECT_PARK,
      payload: park
    })
  }
}

export const updateOrCreatePark = ({ id, name, city, state }) => {
  return async (dispatch) => {
    const response = id ?
      await Park.update(id, { name, city, state }) :
      await Park.create({ name, city, state })

    if (response.errors) return response.errors

    const park = await Park.find(response.id)
    dispatch({ type: SELECT_PARK, payload: park })

    const parks = await Park.all()
    dispatch({ type: FETCH_ALL_PARKS, payload: parks })
  }
}

export const UNSELECT_PARK = 'UNSELECT_PARK'
export const deletePark = (id) => {
  return async (dispatch) => {
    await Park.destroy(id)
    dispatch({ type: UNSELECT_PARK })

    const parks = await Park.all()
    dispatch({ type: FETCH_ALL_PARKS, payload: parks })
  }
}
