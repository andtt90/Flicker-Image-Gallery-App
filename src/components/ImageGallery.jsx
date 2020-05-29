import React from 'react';
import { getFlikerPhotos } from './ImageGalleryService'; 

import './image-gallery.scss';

class ImageGallery extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            queryString: '',
            imageList: [],
            isLoading: false,
        };
    }

    componentDidMount = () => {
        this.search();
    }

    search = async (query) => {
        this.setState({ isLoading: true });

        try {
            const { data: { photos: { photo } } } = await getFlikerPhotos(query);
            this.setState({ imageList: photo });    
        } finally {
            this.setState({ isLoading: false });
        }
    }

    triggerSearch = ({
        currentTarget: { value },
    }) => {
        this.setState({ queryString: value })
        this.search(value);
    };

    render = () => {
        const {
            isLoading,
            imageList,
            queryString,
        } = this.state;

        return (
            <div className="image-gallery">
                <section>
                    <input className="image-gallery-input" value={queryString} onChange={this.triggerSearch} type="search" placeholder="Enter search term"/>
                </section>
                <section>
                    {
                        isLoading && <div className="loader"></div>
                    }
                    {
                        !isLoading && !imageList.length ? <span>Sorry, no photos found :(</span> : ''
                    }
                    {
                        !isLoading && imageList.length? (
                            imageList.map(({
                                farm,
                                server,
                                id,
                                secret,
                            }) => (
                                <img
                                    key={id}
                                    className="image-gallery-img"
                                    src={`https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`}
                                    alt="fliker-img"
                                />
                            ))
                        ) : ''
                    }
                </section>
            </div>
        )
    }
}

export default ImageGallery;