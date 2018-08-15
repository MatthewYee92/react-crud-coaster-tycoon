import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { selectPark } from '../actions/parks'

const mapStateToProps = ({ parks }) => ({ parks: parks.all, selected: parks.selected })
const mapDispatchToProps = (dispatch) => bindActionCreators({
  selectPark
}, dispatch)

const ParksList = ({ parks, selected, selectPark }) => {
  const lis = parks.map(park => {
    const classes = `list-group-item ${ park.id === selected.id && 'active' }`
    return (
      <li onClick={ () => selectPark(park.id) } className={ classes } key={ park.id }>{ park.name }</li>
    )
  })

  return (
    <ul className="list-group">{ lis }</ul>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ParksList)
