import React from 'react';
import Carousel from './Carousel';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class MyTabs extends React.Component {

    // added:
    // integrated with the backend
    // image title and description
    // replaced button titles with icons
    // fixed styling


    constructor(props) {
        super(props);
        this.state = {
            images: [],
            value: 0
        };
        this.getRecent = this.getRecent.bind(this);
        this.getFavorites = this.getFavorites.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.carousel = React.createRef();

    }

    handleChange(event, newValue) {
        if (newValue === 0){
            this.getRecent()
        }
        else {
            this.getFavorites()
        }
        this.setState({ value: newValue })
        
    };

    componentDidMount() {
        this.getRecent();
    }

    getRecent() {
        fetch("https://apod-backend.herokuapp.com/images")
            .then(response => response.json())
            .then(data => {
                this.setState({ images: data });
                console.log(data);
        })

        this.carousel.current.setState({currentIndex: 0});
        this.carousel.current.isFavorite();
    }

    getFavorites() {
        fetch("https://apod-backend.herokuapp.com/images/favorites")
            .then(response => response.json())
            .then(data => {
                this.setState({ images: data });
                console.log(data);
        })

        this.carousel.current.setState({currentIndex: 0});
        this.carousel.current.isFavorite();

    }


    render() {

        return (
            <div>
                <Paper>
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="Recent NASA Images" />
                        <Tab label="Favorite Images" />
                    </Tabs>
                </Paper>
                <Carousel images={this.state.images} ref={this.carousel}/>
            </div>
        );
    }
}

export default MyTabs;