import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getAllParks, selectPark } from './actions/parks'
import ParksList from './components/ParksList'
import ParkForm from './components/ParkForm'
import Park from './components/Park'
window.BASE_URL = 'http://localhost:5000/api'

const mapDispatchToProps = dispatch => bindActionCreators({
  getAllParks,
  selectPark
}, dispatch)
const mapStateToProps = ({ parks }) => ({ parks })

class App extends Component {
  componentDidMount = async () => {
    await this.props.getAllParks()
  }

  render() {
    return (
      <main>
        <div className="jumbotron jumbotron-fluid bg-primary text-white">
          <div className="container">
            <h1 className="display-4">Coaster Tycoon</h1>
          </div>
        </div>
        <section className="container">
          <div className="row">
            <div className="col-3">
              <ParksList
                parks={ this.props.parks.all }
                selected={ this.props.parks.selected } />
            </div>
            <div className="col">
              {
                this.props.parks.selected.id &&
                <Park
                  key={ this.props.parks.selected }
                  parkId={ this.props.parks.selected }
                  resetParks= { this.resetParks }
                  />
              }
            </div>
            <div className="col-4">
              <h2>Create a New Park</h2>
              <hr/>
              <ParkForm resetParks= { this.resetParks } />
            </div>
          </div>
        </section>
      </main>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
