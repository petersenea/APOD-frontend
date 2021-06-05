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
        // if (this.props.images.length !== 0) {
        //     console.log("Component did mount", this.props.images)
        this.isFavorite()
        // }
        // this.processImages()
    }

    isFavorite() {
        // GET from our backend whether this image is favorited
        // input: image date (YYYY-MM-DD)
        // output: image or null
        if (this.props.images.length !== 0) {
            console.log(this.props.images[this.state.currentIndex].date)
            fetch("https://apod-backend.herokuapp.com/images/favorited", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Custom-Header': this.props.images[this.state.currentIndex].date
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    if (data !== null) {
                        console.log("favorite")
                        this.setState({favoriteButton: "Favorite"})
                    }
                    else {
                        console.log("not favorite")
                        this.setState({favoriteButton: "Unfavorite"})
                    }
                });
        }
    }

    favorite() {
        if (this.state.favoriteButton === "Unfavorite") {
            
            // POST to our backend to favorite this image
            // input: image object
            // output: 200 success
            fetch("https://apod-backend.herokuapp.com/images/favorites", {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.props.images[this.state.currentIndex]) // body data type must match "Content-Type" header
            })
                .then(response => {
                    console.log("Favoriting", this.props.images[this.state.currentIndex].date, "with status", response.status)
                    this.setState({ favoriteButton: "Favorite" })
                })
        }
        else {
            // DELETE to our backend to unfavorite this image
            // input: image date (YYYY-MM-DD)
            // output: 200 success
            fetch("https://apod-backend.herokuapp.com/images/favorited", {
                method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ date: this.props.images[this.state.currentIndex].date }) // body data type must match "Content-Type" header
            })
                .then(response => {
                    console.log("Unfavoriting", this.props.images[this.state.currentIndex].date, "with status", response.status)
                    this.setState({ favoriteButton: "Unfavorite", currentIndex: 0 }, this.props.getFavorites())
                })

        }
    }

    goBack() {
        let newIndex = this.state.currentIndex - 1;
        if (newIndex < 0) {
            newIndex = this.props.images.length - 1;
        }
        this.setState({ currentIndex: newIndex }, () => this.isFavorite());
    }

    goNext() {
        let newIndex = this.state.currentIndex + 1;

        if (newIndex > this.props.images.length - 1) {
            newIndex = 0
        }
        this.setState({ currentIndex: newIndex }, () => this.isFavorite());
    }


    render() {
        return (
            <div>
                {this.props.images.length === 0 ?
                    <div>
                    </div>
                    :
                    <div className="carousel-container">

                        <div className="carousel">
                            <button onClick={this.goBack} className="fa fa-chevron-left"></button>
                            <figure>
                                {this.props.images[this.state.currentIndex].media_type === "video" ?
                                    <iframe src={this.props.images[this.state.currentIndex].url} title={this.props.images[this.state.currentIndex].date}></iframe>
                                    :
                                    <img loading="eager" alt={this.props.images[this.state.currentIndex].date} src={this.props.images[this.state.currentIndex].url}></img>
                                }
                                <figcaption>
                                    <div className="image-sub">
                                        <p className="image-count">{this.state.currentIndex + 1} / {this.props.images.length}</p>
                                        <button onClick={this.favorite}>
                                            {this.state.favoriteButton === "Favorite" ?
                                                <i className="fa fa-star"></i>
                                                :
                                                <i className="fa fa-star-o"></i>}
                                        </button>
                                    </div>
                                </figcaption>
                            </figure>
                            <button onClick={this.goNext}><i className="fa fa-chevron-right"></i></button>


                        </div>



                        <div className="image-info">
                            <p className="image-title">{this.props.images[this.state.currentIndex].title}</p>
                            <p className="image-date">{this.props.images[this.state.currentIndex].date.slice(0,10)}</p>
                            <p className="image-description">{this.props.images[this.state.currentIndex].explanation}</p>
                        </div>
                    </div>
                }

            </div>
        );
    }
}

export default Carousel;