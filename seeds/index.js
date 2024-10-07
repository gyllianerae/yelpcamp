require('dotenv').config();

const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp';

mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 300; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
          //YOUR USER ID
            author: '670424c27ff558261296e86d',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque voluptatibus distinctio laudantium. Quia tenetur culpa esse eos ad nostrum, officiis ullam assumenda, ea, quo corporis sed consectetur hic nisi facere!',
            price: price,
            geometry: {
              type: "Point",
              coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude,
            ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dib4shjvr/image/upload/v1721870859/YelpCamp/mhnugkv8vnxaydab7hjs.png',
                  filename: 'YelpCamp/mhnugkv8vnxaydab7hjs',
                },
                {
                  url: 'https://res.cloudinary.com/dib4shjvr/image/upload/v1721870859/YelpCamp/qr7a3elagkpszgivui7d.png',
                  filename: 'YelpCamp/qr7a3elagkpszgivui7d',
                }
              ]
        })
        await camp.save(); 
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})