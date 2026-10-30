const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedhelpers');
const Campground = require('../models/campgrounds');



   const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp-maptiler'

    mongoose.connect(dbUrl);


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log("Database connection")
});

const sample = array => array[Math.floor(Math.random() * array.length)]



const seedDB = async () => {
    await Campground.deleteMany({});
    for (let index = 0; index < 50; index++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground ({
            author: '6ade30e4171f29a800025e35',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,

                        geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },

            image: `https://picsum.photos/400?random=${Math.random()}`,
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic inventore quibusdam, earum eum praesentium cumque ipsam nisi id harum explicabo distinctio veniam, corrupti nam itaque ipsa, similique tempora ratione repellat!',
            price,
            images: [
                
                    {
                    url: 'https://res.cloudinary.com/kihivczu/image/upload/v1792683928/YelpCamp/j7c2bhqkjmxez5dydomj.jpg',
                    filename: 'YelpCamp/j7c2bhqkjmxez5dydomj'
                    },

                    {
                    url: 'https://res.cloudinary.com/kihivczu/image/upload/v1792683931/YelpCamp/aza8kykxhxqb2veh491a.jpg',
                    filename: 'YelpCamp/aza8kykxhxqb2veh491a'
                    },

                    {
                    url: 'https://res.cloudinary.com/kihivczu/image/upload/v1792683932/YelpCamp/bqe7mm9kqndqgmrxbcva.jpg',
                    filename: 'YelpCamp/bqe7mm9kqndqgmrxbcva'
                    }
                
            ]
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})