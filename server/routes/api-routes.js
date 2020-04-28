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

// -----------------------------------------------------------------------------------------

  // // add/pushes an EXERCISE into a WORKOUT
  // // Updates the Workout Model
  // app.put('/api/workouts/:id', (req, res) => {
  //   // create a new exercise using request.body
  //   const workoutID = req.params.id
  //   console.log(workoutID)
  //   // const exercise = new db.Exercise(req.body);
  //   // console.log('EXERCISE TO ADD: ',exercise);

  //   db.Exercise.create(req.body)
  //     .then(({ _id }) => db.Workout.findOneAndUpdate({ _id: workoutID }, { $push: { exercises: _id }}, { new: true }))
  //     .then(dbWorkout => {
  //       res.json(dbWorkout);
  //     })
  //     .catch(err => {
  //       // if an error occurs send the error to the client
  //       res.json(err);
  //     });
  // });
  
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
  
  // app.get('/api/workouts/:id', (req, res) => {
  //   db.Workout.findOne({ _id: req.params.id })
  //   .then(dbWorkout => {
  //     res.json(dbWorkout)
  //   })
  //   .catch(err => {
  //     res.json(err);
  //   });
  // });




};