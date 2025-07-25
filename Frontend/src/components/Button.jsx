import React from 'react'
import PropTypes from 'prop-types'

function Button(props) {
  return (
    <button>{props.name}</button>
  )
}
Button.propTypes = {
    name : PropTypes.string.isRequired
}

export default Button