import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { selectPark, deletePark } from '../actions/parks'
import ParkForm from './ParkForm'

const mapStateToProps = ({ parks: { selected } }) => ({ selected })
const mapDispatchToProps = (dispatch) => bindActionCreators({
  selectPark, deletePark
}, dispatch)

class Park extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showEdit: false
    }
  }

  destroyPark = async () => {
    await this.props.deletePark(this.props.selected.id)
    await this.props.selectPark()
  }

  toggleEdit = () => {
    this.setState({ showEdit: !this.state.showEdit })
  }

  render () {
    const park = this.props.selected
    const lis = park.rides.map(ride => {
      return <li key={ ride.id }>{ ride.name } ({ ride.capacity } Capacity)</li>
    })
    const buttons = (
      <div>
        <a onClick={ this.toggleEdit } className="btn btn-light d-block text-dark">Edit { park.name } Record</a>
        <a onClick={ this.destroyPark } className="btn btn-danger text-white d-block mt-2">Delete { park.name }</a>
      </div>
    )

    return (
      <div className="card">
        <div className="card-header">
          { park.name }
        </div>
        <div className="card-body">
          <h5 className="card-title">{ park.city }, { park.state }</h5>
          <hr/>
          <h6>Rides:</h6>
          <ul>
            { lis }
          </ul>
          {
            this.state.showEdit ?
            (
              <div>
                <hr/>
                <ParkForm key={ park.id } park={ park } toggleEdit={ this.toggleEdit } resetParks={ this.props.resetParks } />
              </div>
            ) :
            buttons
          }
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Park)
