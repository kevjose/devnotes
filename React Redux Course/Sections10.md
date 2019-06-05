# Using ref's for DOM Access

- V2 implementation
- grid css system `<div style='display:grid'></div>`

```css
// component/ImageList_css
.image-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 0 10px;
  grid-auto-rows: 10px; // how tall the rows should be
}

.image-list img {
  width: 250px;
  grid-row-end: span 2;
}
```

```javascript
// components/ImageList.js
import './ImageList.css';
import React from 'react';

const ImageList = props => {
  const images = props.images.map(image => {
    return (
      <img key={image.id} src={image.urls.regular} alt={image.description} />
    );
  });
  return <div className="image-list"> {images} </div>;
};

export default ImageList;
```

- the grid row end property has to be dynamically set
- use the react ref system to calculate the spans needed while rendering each image

```javascript
// component/ImageCard.js
import React from 'react';
class ImageCard extends React.Component {
  render() {
    const {description, urls} = this.props.image;
    return (
      <div>
        <img
          alt={description}
          src={urls.regular}
        />
      </div>
    );
  }
}

export default ImageCard;



// components/ImageList.js
import './ImageList.css';
import React from 'react';
import ImageCard from './ImageCard';

const ImageList = props => {
  const images = props.images.map(image => {
    return (
      <ImageCard key={image.id} image={image} />
    );
  });
  return <div className="image-list"> {images} </div>;
};

export default ImageList;
```

- Let the ImageCard render itself and its image
- Reach the DOM and figure out the height of the image
- Set the image height on the state to get the component to re-render
- When re-rendering, assign a gridRowEnd to make sure the image takes appropriate number of spans ie space

- React refs
- Gives access to a single DOM element
- We create refs in the constructor, assign them to an instance variable, then pass to a particular JSX element as props

```javascript
// component/ImageCard.js

import React from 'react';

class ImageCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { spans: 0 };
    this.imageRef = React.createRef();
  }

  componentDidMount() {
    this.imageRef.current.addEventListener('load', this.setSpans);
  }

  setSpans = () => {
    const height = this.imageRef.current.clientHeight;
    const spans = Math.ceil(height / 10);
    this.setState({ spans });
  };

  render() {
    const { description, urls } = this.props.image;

    return (
      <div style={{ gridRowEnd: `span ${this.state.spans}` }}>
        <img ref={this.imageRef} alt={description} src={urls.regular} />
      </div>
    );
  }
}

export default ImageCard;
```
