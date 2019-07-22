/* eslint-disable react/jsx-child-element-spacing */
import React from 'react'
import { Provider, connect } from 'react-redux'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'

import store from './store'
import { fetchCookies, deleteCookie, editCookie } from './cookiesReducer'
import SingleCookie from './SingleCookie'
import NewCookieForm from './NewCookieForm'

// Binding is only really useful if we care about the this context.

const liStyle = {
  display: 'flex',
  flexDirection: 'column',
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {}
  }
  componentDidMount() {
    this.props.getCookiesFromServer()
  }
  handleClick(cookieId) {
    this.props.deleteCookieFromServer(cookieId)
  }
  handleChange(event) {
    console.log(event.target.value)
    this.setState({
      [event.target.name]: event.target.value,
    })
    // this.props.deleteCookieFromServer(cookieId)
  }
  handleSubmit(cookieId) {
    // const inputValue = event.target.parentNode.querySelector('input').value
    // console.log(inputValue)
    this.props.editCookieOnServer(cookieId, this.state[cookieId])
  }
  render() {
    console.log('this.props', this.props)
    const { cookies } = this.props
    if (!cookies || cookies.length === 0) {
      return <NewCookieForm />
    }
    return (
      <React.Fragment>
        <h1>Hello from REACT....</h1>
        <NewCookieForm />
        <Switch>
          <Route exact path="/" component={SingleCookie} />
          <Route path="/cookies/:id" component={SingleCookie} />
        </Switch>
        <ul>
          {cookies.map(cookie => (
            <li key={cookie.id} style={liStyle}>
              <Link to={`/cookies/${cookie.id}`}>{cookie.name}</Link>
              <label>
                Change Name:
                <input
                  name={cookie.id}
                  type="text"
                  onChange={this.handleChange}
                />
                <button
                  onClick={() => this.handleSubmit(cookie.id)}
                  type="button"
                >
                  Confirm
                </button>
              </label>
              <button onClick={() => this.handleClick(cookie.id)} type="button">
                X
              </button>
            </li>
          ))}
        </ul>
      </React.Fragment>
    )
  }
}

// READING FROM REDUX
const mapState = state => {
  return {
    cookies: state.cookies,
    wholeState: state,
  }
}

// WRITING TO REDUX
const mapDispatch = dispatch => {
  return {
    getCookiesFromServer: () => dispatch(fetchCookies()),
    deleteCookieFromServer: id => dispatch(deleteCookie(id)),
    editCookieOnServer: (id, cookieName) =>
      dispatch(editCookie(id, cookieName)),
  }
}

const ConnectedApp = connect(
  mapState,
  mapDispatch
)(App)

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ConnectedApp />
    </Router>
  </Provider>,
  document.getElementById('app')
)
