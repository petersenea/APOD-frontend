import React from 'react';
import Carousel from './Carousel';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class MyTabs extends React.Component {

    constructor(props) {
        super(props);
        // initialization code
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
        // fetch("https://api.nasa.gov/planetary/apod?api_key=<API_KEY>&start_date=2021-05-13&end_date=2021-05-19")
        //     .then(response => response.json())
        //     .then(data => {
        //         this.setState({ images: data });
        //         console.log(data);
        // })

        // Sample response from API until we get the backend working
        this.setState({
            images: [
                {
                    "copyright": "Grand Mesa Observatory",
                    "date": "2021-05-13",
                    "explanation": "Closest to the Sun on March 1, and closest to planet Earth on April 23, this Comet ATLAS (C/2020 R4) shows a faint greenish coma and short tail in this pretty, telescopic field of view. Captured at its position on May 5, the comet was within the boundaries of northern constellation Canes Venatici (the Hunting Dogs), and near the line-of-sight to intriguing background galaxies popularly known as the Whale and the Hockey Stick. Cetacean in appearance but Milky Way sized, NGC 4631 is a spiral galaxy seen edge-on at the top right, some 25 million light-years away. NGC 4656/7 sports the bent-stick shape of interacting galaxies below and left of NGC 4631. In fact, the distortions and mingling trails of gas detected at other wavelengths suggest the cosmic Whale and Hockey Stick have had close encounters with each other in their distant past. Outbound and only about 7 light-minutes from Earth this Comet ATLAS should revisit the inner solar system in just under 1,000 years.",
                    "hdurl": "https://apod.nasa.gov/apod/image/2105/ATLASHockeyStickWhaleGalaxiesGrandMesa.jpg",
                    "media_type": "image",
                    "service_version": "v1",
                    "title": "The Comet, the Whale, and the Hockey Stick",
                    "url": "https://apod.nasa.gov/apod/image/2105/ATLASHockeyStickWhaleGalaxiesGrandMesa1024.jpg"
                },
                {
                    "copyright": "Bray Falls",
                    "date": "2021-05-14",
                    "explanation": "A gorgeous spiral galaxy, M104 is famous for its nearly edge-on profile featuring a broad ring of obscuring dust lanes. Seen in silhouette against an extensive central bulge of stars, the swath of cosmic dust lends a broad brimmed hat-like appearance to the galaxy suggesting a more popular moniker, the Sombrero Galaxy. This sharp optical view of the well-known galaxy made from ground-based image data was processed to preserve details often lost in overwhelming glare of M104's bright central bulge. Also known as NGC 4594, the Sombrero galaxy can be seen across the spectrum, and is host to a central supermassive black hole. About 50,000 light-years across and 28 million light-years away, M104 is one of the largest galaxies at the southern edge of the Virgo Galaxy Cluster. Still the colorful spiky foreground stars in this field of view lie well within our own Milky Way galaxy.",
                    "hdurl": "https://apod.nasa.gov/apod/image/2105/m104apodsub.jpg",
                    "media_type": "image",
                    "service_version": "v1",
                    "title": "M104: The Sombrero Galaxy",
                    "url": "https://apod.nasa.gov/apod/image/2105/m104apodsub800c.jpg"
                },
                {
                    "date": "2021-05-15",
                    "explanation": "Undulating bright ridges and dusty clouds cross this close-up of the nearby star forming region M8, also known as the Lagoon Nebula. A sharp, false-color composite of narrow band visible and broad band near-infrared data from the 8-meter Gemini South Telescope, the entire view spans about 20 light-years through a region of the nebula sometimes called the Southern Cliff. The highly detailed image explores the association of many newborn stars imbedded in the tips of the bright-rimmed clouds and Herbig-Haro objects. Abundant in star-forming regions, Herbig-Haro objects are produced as powerful jets emitted by young stars in the process of formation heat the surrounding clouds of gas and dust. The cosmic Lagoon is found some 5,000 light-years away toward the constellation Sagittarius and the center of our Milky Way Galaxy. (For location and scale, check out this image superimposing the close-up of the Southern Cliff within the larger Lagoon Nebula. The scale image is courtesy R. Barba'.)",
                    "hdurl": "https://apod.nasa.gov/apod/image/2105/M8_rim2geminicrop1024.jpg",
                    "media_type": "image",
                    "service_version": "v1",
                    "title": "The Southern Cliff in the Lagoon",
                    "url": "https://apod.nasa.gov/apod/image/2105/M8_rim2geminicrop600.jpg"
                },
                {
                    "date": "2021-05-16",
                    "explanation": "The clouds may look like an oyster, and the stars like pearls, but look beyond. Near the outskirts of the Small Magellanic Cloud, a satellite galaxy some 200 thousand light-years distant, lies 5 million year young star cluster NGC 602. Surrounded by natal gas and dust, NGC 602 is featured in this stunning Hubble image of the region. Fantastic ridges and swept back shapes strongly suggest that energetic radiation and shock waves from NGC 602's massive young stars have eroded the dusty material and triggered a progression of star formation moving away from the cluster's center. At the estimated distance of the Small Magellanic Cloud, the featured picture spans about 200 light-years, but a tantalizing assortment of background galaxies are also visible in this sharp multi-colored view. The background galaxies are hundreds of millions of light-years or more beyond NGC 602.",
                    "hdurl": "https://apod.nasa.gov/apod/image/2105/Ngc602_Hubble_3749.jpg",
                    "media_type": "image",
                    "service_version": "v1",
                    "title": "NGC 602 and Beyond",
                    "url": "https://apod.nasa.gov/apod/image/2105/Ngc602_Hubble_960.jpg"
                },
                {
                    "copyright": "CFHT",
                    "date": "2021-05-17",
                    "explanation": "Is our Milky Way Galaxy this thin?  Magnificent spiral galaxy NGC 4565 is viewed edge-on from planet Earth. Also known as the Needle Galaxy for its narrow profile, bright NGC 4565 is a stop on many telescopic tours of the northern sky, in the faint but well-groomed constellation Coma Berenices. This sharp, colorful image reveals the spiral galaxy's boxy, bulging central core cut by obscuring dust lanes that lace NGC 4565's thin galactic plane. An assortment of other background galaxies is included in the pretty field of view. Thought similar in shape to our own Milky Way Galaxy, NGC 4565 lies about 40 million light-years distant and spans some 100,000 light-years.  Easily spotted with small telescopes, sky enthusiasts consider NGC 4565 to be a prominent celestial masterpiece Messier missed.",
                    "hdurl": "https://apod.nasa.gov/apod/image/2105/NGC4565_CFHT_1779.jpg",
                    "media_type": "image",
                    "service_version": "v1",
                    "title": "NGC 4565: Galaxy on Edge",
                    "url": "https://apod.nasa.gov/apod/image/2105/NGC4565_CFHT_960.jpg"
                },
                {
                    "date": "2021-05-18",
                    "explanation": "What celestial body wears the Necklace Nebula? First, analyses indicate that the Necklace is a planetary nebula, a gas cloud emitted by a star toward the end of its life. Also, what appears to be diamonds in the Necklace are actually bright knots of glowing gas.  In the center of the Necklace Nebula are likely two stars orbiting so close together that they share a common atmosphere and appear as one in the featured image by the Hubble Space Telescope.  The red-glowing gas clouds on the upper left and lower right are the results of jets from the center.  Exactly when and how the bright jets formed remains a topic of research.  The Necklace Nebula is only about 5,000 years old, spans about 5 light years, and can best be found with a large telescope toward the direction of the constellation of the Arrow (Sagitta).",
                    "hdurl": "https://apod.nasa.gov/apod/image/2105/Necklace_Hubble_2029.jpg",
                    "media_type": "image",
                    "service_version": "v1",
                    "title": "Jets from the Necklace Nebula",
                    "url": "https://apod.nasa.gov/apod/image/2105/Necklace_Hubble_960.jpg"
                },
                {
                    "copyright": "Jason Guenzel",
                    "date": "2021-05-19",
                    "explanation": "Normally faint and elusive, the Jellyfish Nebula is caught in this alluring scene. In the telescopic field of view two bright yellowish stars, Mu and Eta Geminorum, stand just below and above the Jellyfish Nebula at the left. Cool red giants, they lie at the foot of the celestial twin. The Jellyfish Nebula itself floats below and left of center, a bright arcing ridge of emission with dangling tentacles. In fact, the cosmic jellyfish is part of bubble-shaped supernova remnant IC 443, the expanding debris cloud from a massive star that exploded. Light from that explosion first reached planet Earth over 30,000 years ago. Like its cousin in astrophysical waters the Crab Nebula supernova remnant, the Jellyfish Nebula is known to harbor a neutron star, the remnant of the collapsed stellar core. Composed on April 30, this telescopic snapshot also captures Mars. Now wandering through early evening skies, the Red Planet also shines with a yellowish glow on the right hand side of the field of view. Of course, the Jellyfish Nebula is about 5,000 light-years away, while Mars is currently almost 18 light-minutes from Earth.",
                    "hdurl": "https://apod.nasa.gov/apod/image/2105/Guenzel-JellyfishMars30APR2021.jpg",
                    "media_type": "image",
                    "service_version": "v1",
                    "title": "The Jellyfish and Mars",
                    "url": "https://apod.nasa.gov/apod/image/2105/Guenzel-JellyfishMars30APR2021_1000.jpg"
                }
            ]
        })

        this.carousel.current.setState({currentIndex: 0});
        this.carousel.current.isFavorite();
    }

    getFavorites() {
        // fetch("https://api.nasa.gov/planetary/apod?api_key=<API_KEY>&start_date=2021-05-13&end_date=2021-05-19")
        //     .then(response => response.json())
        //     .then(data => {
        //         this.setState({ images: data });
        //         console.log(data);
        // })

        // Sample response from our backend until we get the backend working
        this.setState({
            images: [{
                "date": "2021-05-18",
                "explanation": "What celestial body wears the Necklace Nebula? First, analyses indicate that the Necklace is a planetary nebula, a gas cloud emitted by a star toward the end of its life. Also, what appears to be diamonds in the Necklace are actually bright knots of glowing gas.  In the center of the Necklace Nebula are likely two stars orbiting so close together that they share a common atmosphere and appear as one in the featured image by the Hubble Space Telescope.  The red-glowing gas clouds on the upper left and lower right are the results of jets from the center.  Exactly when and how the bright jets formed remains a topic of research.  The Necklace Nebula is only about 5,000 years old, spans about 5 light years, and can best be found with a large telescope toward the direction of the constellation of the Arrow (Sagitta).",
                "hdurl": "https://apod.nasa.gov/apod/image/2105/Necklace_Hubble_2029.jpg",
                "media_type": "image",
                "service_version": "v1",
                "title": "Jets from the Necklace Nebula",
                "url": "https://apod.nasa.gov/apod/image/2105/Necklace_Hubble_960.jpg"
            },
            {
                "copyright": "Jason Guenzel",
                "date": "2021-05-19",
                "explanation": "Normally faint and elusive, the Jellyfish Nebula is caught in this alluring scene. In the telescopic field of view two bright yellowish stars, Mu and Eta Geminorum, stand just below and above the Jellyfish Nebula at the left. Cool red giants, they lie at the foot of the celestial twin. The Jellyfish Nebula itself floats below and left of center, a bright arcing ridge of emission with dangling tentacles. In fact, the cosmic jellyfish is part of bubble-shaped supernova remnant IC 443, the expanding debris cloud from a massive star that exploded. Light from that explosion first reached planet Earth over 30,000 years ago. Like its cousin in astrophysical waters the Crab Nebula supernova remnant, the Jellyfish Nebula is known to harbor a neutron star, the remnant of the collapsed stellar core. Composed on April 30, this telescopic snapshot also captures Mars. Now wandering through early evening skies, the Red Planet also shines with a yellowish glow on the right hand side of the field of view. Of course, the Jellyfish Nebula is about 5,000 light-years away, while Mars is currently almost 18 light-minutes from Earth.",
                "hdurl": "https://apod.nasa.gov/apod/image/2105/Guenzel-JellyfishMars30APR2021.jpg",
                "media_type": "image",
                "service_version": "v1",
                "title": "The Jellyfish and Mars",
                "url": "https://apod.nasa.gov/apod/image/2105/Guenzel-JellyfishMars30APR2021_1000.jpg"
            }]
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