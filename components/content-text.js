import React from 'react'

const Text = ({ title, text }) => (
  <div>
    <h2>{ title }</h2>
    <div dangerouslySetInnerHTML={ { __html: text } } />
  </div>
)

export default Text
