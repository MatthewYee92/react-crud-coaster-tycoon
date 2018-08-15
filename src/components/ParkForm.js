import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateOrCreatePark, selectPark } from '../actions/parks'

const mapStateToProps = ({ parks: { selected } }) => ({ park: selected })
const mapDispatchToProps = dispatch => bindActionCreators({
  updateOrCreatePark, selectPark
}, dispatch)

class ParkForm extends Component {
  constructor (props) {
    super(props)
    const { name='', city='', state='', id=null } = this.props.park
    this.state = {
      id,
      name,
      city,
      state,
      errors: []
    }
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onSubmit = async (event) => {
    event.preventDefault()

    const errors = await this.props.updateOrCreatePark(this.state)
    if (errors) return this.setState({ errors })

    this.props.toggleEdit && this.props.toggleEdit()
  }

  render () {
    const errors = this.state.errors.map((error, index) => {
      return <p key={ index } className="m-1">{ error }</p>
    })

    const cancel = this.state.id && (
      <a onClick={ this.props.toggleEdit } className="btn btn-light mt-4 ml-4">Cancel</a>
    )

    return (
      <form onSubmit={ this.onSubmit }>
        <div className="form-group">
          <label htmlFor="name">
            Park Name
          </label>
          <input onChange={ this.onChange } value={ this.state.name } type="text" className="form-control" name="name" id="name" />
          <label htmlFor="city">
            Park City
          </label>
          <input onChange={ this.onChange } value={ this.state.city } type="text" className="form-control" name="city" id="city" />
          <label htmlFor="state">
            Park State
          </label>
          <input onChange={ this.onChange } value={ this.state.state } type="text" className="form-control" name="state" id="state" />

          <button type="submit" className="btn btn-primary mt-4">Submit</button>
          { cancel }
        </div>
        { !!errors.length && <div className="alert alert-danger">{ errors }</div> }
      </form>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ParkForm)
