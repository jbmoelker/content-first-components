import React from 'react'
import Gallery from './content-gallery'
import Text from './content-text'

const contentComponents = {
    'gallery': Gallery,
    'text': Text,
}

const ContentItem = ({ item }) => {
    const ContentComponent = contentComponents[item.itemType]
    return ContentComponent
        ? <ContentComponent { ...item } />
        : <div>{ `Content with unknown item type "${item.itemType}"` }</div>
}

const Content = ({ items }) => (
    <div>
        { items.map((item, index) => <ContentItem key={ index } item={ item } />) }
    </div>
)

export default Content
