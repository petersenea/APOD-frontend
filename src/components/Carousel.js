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
        fetch("https://apod-backend.herokuapp.com/images/favorited", {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'date': '2021-05-10'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            // body: JSON.stringify({date: "2021-05-10"}) // body data type must match "Content-Type" header
        })
            .then(response => response.json())
            .then(data => {
                if (data != null) {
                    this.setState({ favoriteButton: "Favorite" })
                }
                console.log('isFavorite()', data);
            });
    }

    favorite() {
        if (this.state.favoriteButton === "Favorite") {
            this.setState({ favoriteButton: "Unfavorite" })
            // POST to our backend to favorite this image
            // input: image object
            // output: 200 success
            fetch("https://apod-backend.herokuapp.com/images/favorites", {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(this.props.images[this.state.currentIndex]) // body data type must match "Content-Type" header
            })
                .then(response => {
                    console.log("Favoriting", this.props.images[this.state.currentIndex].date, "with status", response.status)
                })
        }
        else {
            this.setState({ favoriteButton: "Favorite" })
            // DELETE to our backend to unfavorite this image
            // input: image date (YYYY-MM-DD)
            // output: 200 success
            fetch("https://apod-backend.herokuapp.com/images/favorited", {
                method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({ date: this.props.images[this.state.currentIndex].date }) // body data type must match "Content-Type" header
            })
                .then(response => {
                    console.log("Unfavoriting", this.props.images[this.state.currentIndex].date, "with status", response.status)
                })

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

        if (newIndex > this.props.images.length - 1) {
            newIndex = 0
        }
        this.setState({ currentIndex: newIndex });
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
                            <button onClick={this.goBack} className="fas fa-chevron-left"></button>
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
                                                <i className="far fa-star"></i>
                                                :
                                                <i className="fas fa-star"></i>}
                                        </button>
                                    </div>
                                </figcaption>
                            </figure>
                            <button onClick={this.goNext}><i className="fas fa-chevron-right"></i></button>


                        </div>



                        <div className="image-info">
                            <p className="image-title">{this.props.images[this.state.currentIndex].title}</p>
                            <p className="image-date">{this.props.images[this.state.currentIndex].date}</p>
                            <p className="image-description">{this.props.images[this.state.currentIndex].explanation}</p>
                        </div>
                    </div>
                }

            </div>
        );
    }
}

export default Carousel;