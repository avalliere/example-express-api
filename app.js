const express = require ('express');
const app = express();
const PORT = 8080;

// express does not parse json from request body by default. So in line 6, we are telling it to use json middleware so we can use json in our request bodies
app.use(express.json());

// this configures the server
app.listen(
  PORT,
  () => console.log(`Server running on http://localhost:${PORT}`)
)

// Endpoint: GET http://localhost:8080/kitten
// 1st argument is the route
// 2nd argument is the callback function - we pass in request and response objects here
app.get('/kitten', (req, res) => {
// this example will always respond with Magpie, but normally we would be getting from a database
  res.status(200).send({
    'id': 1,
    'kitten': '🐈‍⬛',
    'name': 'Magpie'
  })
});

// Endpoint: POST http://localhost:8080/kitten/1
// ':id' is dynamic - this route will handle any id we pass in
app.post('/kitten/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

// we can respond with an error message if a required param is missing
  if (!name) {
    res.status(400).send({ message: 'Kitten needs a name!'})
  }

// we have no database for this example, so we're just sending a success message
  res.status(201).send({
    message: `Kitten ${id} created with name: ${name}`
  });
})

// this is all we need to serve up static files within the public directory
// with the server runnnig, go to http://localhost:8080/index.html to see what we get!
app.use(express.static('public'))