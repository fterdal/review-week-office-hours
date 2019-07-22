/* eslint-disable react/prefer-stateless-function */
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchSingleCookie } from './singleCookieReducer'
import { withRouter } from 'react-router'

const SingleCookie = props => {
  // this.props.fetchSingleCookieFromServer(this.props.match.params.id)
  // console.log('RENDERING SINGLE COOKIE')
  // console.log('PROPS', props)
  useEffect(() => {
    props.fetchSingleCookieFromServer(props.match.params.id)
  }, [props.match.params.id])
  const { name } = props.singleCookie
  if (props.cookies.length === 0) return 'Loading...'
  return <div>SingleCookie Component: {name}</div>
}

const mapState = store => {
  return {
    singleCookie: store.singleCookie,
    cookies: store.cookies
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSingleCookieFromServer: id => dispatch(fetchSingleCookie(id)),
  }
}

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(SingleCookie)
)
