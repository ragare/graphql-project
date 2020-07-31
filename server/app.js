const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const schema = require('./schema/schema');

mongoose.connect(
    `mongodb+srv://${process.env.MGDB_USER}:${process.env.MGDB_PASSWORD}@cluster0.hko9p.mongodb.net/gq-course?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
    console.log('Yes! We are connected!');
});


app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: schema
}));


app.listen(4000, () => {
    console.log('Listening in 4000');
});