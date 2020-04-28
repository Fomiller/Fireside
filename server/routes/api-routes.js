const db = require('../models');
console.log(db.User);

module.exports = function(app){
  // gets ALL USERS
  app.get("/api/users", (req, res) => {
    db.User.find({})
      .then(User => {
        res.json(User);
      })
      .catch(err => {
        res.json(err)
      });
  });

  // creates a USER
  app.post('/api/users', ({ body }, res) => {
    // create a new User using request.body
    const user = new db.User(body);

    db.User.create(user)
      .then(user => {
        // if saved correctly send the new User document to the client
        res.json(user);
      })
      .catch(err => {
        // if an error occurs send the error to the client
        res.json(err);
      });
  });

  // get a single USER by id
  app.get('/api/users/:id', (req, res) => {
    db.User.findOne({ _id: req.params.id })
    .then(User => {
      res.json(User)
    })
    .catch(err => {
      res.json(err);
    });
  });

  app.put('/api/users/:id', (req, res) => {
    db.User.findOneAndUpdate({_id:req.params.id}, req.body, { new: true })
    .then(User => 
      res.json(User)
    )
    .catch(err => {
      // if an error occurs send the error to the client
      res.json(err);
    });

  });
  

// -----------------------------------------------------------------------------------------

  // add/pushes an EXERCISE into a WORKOUT
  // Updates the Workout Model

  
  // app.get('/api/workouts/range', (req, res) => {
  //   db.Workout.find({})
  //   .populate('exercises')
  //     .then(dbWorkout => {
  //       res.json(dbWorkout);
  //     })
  //     .catch(err => {
  //       res.json(err)
  //     });
  // });
  





};