import React from 'react'
import imageUrl from '../lib/image-url'

const Gallery = ({ title, images }) => (
  <div>
      <h2>{ title }</h2>
      <ul>
      { images.map(image => (
        <li key={ image.url }>
          <img alt={ image.alt || '' } src={ imageUrl(image.url, { w: 100 }) } />
        </li>
      )) }
      </ul>
  </div>
)

export default Gallery
