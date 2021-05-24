import React from 'react';

class Carousel extends React.Component {

    constructor(props) {
        super(props);
        // initialization code
        this.state = {
            currentIndex: 0,
            favoriteButton: ""
        };
        this.goBack = this.goBack.bind(this);
        this.goNext = this.goNext.bind(this);
        this.favorite = this.favorite.bind(this);
        this.isFavorite = this.isFavorite.bind(this);
    }

    componentDidMount() {
        this.isFavorite()
        // this.processImages()
    }

    isFavorite() {
        // GET from our backend whether this image is favorited
        // input: image date (YYYY-MM-DD)
        // output: image or null
        this.setState({ favoriteButton: "Favorite" })
    }

    favorite() {
        if (this.state.favoriteButton === "Favorite") {
            this.setState({ favoriteButton: "Unfavorite" })
            // POST to our backend to favorite this image
            // input: image object
            // output: 200 success
        }
        else {
            this.setState({ favoriteButton: "Favorite" })
            // POST to our backend to unfavorite this image
            // input: image date (YYYY-MM-DD)
            // output: 200 success
        }
    }

    goBack() {
        this.isFavorite()

        let newIndex = this.state.currentIndex - 1;
        if (newIndex < 0) {
            newIndex = this.props.images.length - 1;
        }
        this.setState({ currentIndex: newIndex });
    }

    goNext() {
        this.isFavorite()

        let newIndex = this.state.currentIndex + 1;

        if(newIndex > this.props.images.length -1){
            newIndex = 0
        }
        // let newIndex = (this.state.currentIndex + 1) % this.props.images.length;
        this.setState({ currentIndex: newIndex });
    }


    render() {
        return (
            <div>
                {this.props.images.length === 0 ?
                    <div>
                    </div>
                    :
                    <div>
                        <div className="carousel">
                            <button onClick={this.goBack}>Back</button>
                            <img loading="eager" alt={this.props.images[this.state.currentIndex].date} src={this.props.images[this.state.currentIndex].url}></img>
                            <button onClick={this.goNext}>Next</button>
                        </div>
                        <p>
                            <b>Date: </b>{this.props.images[this.state.currentIndex].date}
                        </p>
                        <button onClick={this.favorite}>{this.state.favoriteButton}</button>
                    </div>
                }

            </div>
        );
    }
}

export default Carousel;