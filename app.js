var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const teams = require("./routes/teams");
const players = require("./routes/players");
const pitches = require("./routes/pitches");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/teams', teams.findAll);
app.get('/teams/totalTeams', teams.totalTeams);
app.get('/players', players.findAll);
app.get('/players/totalPlayers', players.totalPlayers);
app.get('/pitches', pitches.findAll);
app.get('/pitches/totalPitches', pitches.totalPitches);
app.get('/teams/:id', teams.findOne);
app.get('/players/:id', players.findOne);
app.get('/pitches/:id', pitches.findOne);
app.get('/teams/sport/:teamSport', teams.findBySport);
app.get('/players/playerPosition/:playerPosition', players.findByPosition);
app.get('/pitches/pitchSport/:pitchSport', pitches.findBySport);
app.get('/teams/teamLeague/:teamLeague', teams.findByLeague);
app.get('/players/playerSport/:playerSport', players.findBySport);
app.get('/pitches/pitchLocation/:pitchLocation', pitches.findByLocation);

app.post('/teams', teams.addTeam);
app.post('/players', players.addPlayer);
app.post('/pitches', pitches.addPitch);

app.put('/teams/:id/updateTeam', teams.updateTeam);
app.put('/players/:id/updatePlayer', players.updatePlayer);
app.put('/pitches/:id/updatePitch', pitches.updatePitch);

app.delete('/teams/:id', teams.deleteTeam);
app.delete('/players/:playerID', players.deletePlayer);
app.delete('/pitch/:pitchID', pitches.deletePitch);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
