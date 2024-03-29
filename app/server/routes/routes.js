
/////////////
// THEDOMN // NU UMBLA DACA NU STII CE FACI
/////////////






module.exports = function(app, knex,bookshelf) {


		var sessionEngine;


app.get('/', is_authenticated, function(req, res, next) {
  const username = req.session.username;
  const accID = req.session.accID;
  const accRegisterDate = new Date(req.session.accRegisterDate);
  const regDate = accRegisterDate.toLocaleDateString('ro-RO', { year: 'numeric', month: 'long', day: 'numeric' });
  const accEmail = req.session.accEmail;
  let moneyArray = []; 
  let nameArray = [];
   let hoursPlayed = []; 
   let lastArea = [];
  Character.where({ account: accID })
    .fetchAll()
    .then((characters) => {
      characters.forEach((character) => {
        moneyArray.push(character.get('money')); 
        nameArray.push(character.get('charactername')); 
        hoursPlayed.push(character.get('hoursplayed'));
        lastArea.push(character.get('lastarea'));
      });

      res.render('index.ejs', {
        // ACCOUNT OWL
        username: username,
        accID: accID,
        accEmail: accEmail,
        regDate: regDate,
        // CHARACTER OWL
        moneyArray: moneyArray,
        nameArray: nameArray,
        hoursPlayed: hoursPlayed,
        lastArea: lastArea, 
      });
    })
    .catch((error) => {
      console.error('Eroare la obținerea caracterelor:', error);
    });
});

///////////////////// FACTIONS


app.get('/factions', is_authenticated, function(req, res, next) {
	let fName = [];
	let fType = [];
  Faction 
    .fetchAll() 
    .then((factions) => {
        fName.push(factions.get('name'));
        fType.push(factions.get('type'));
      res.render('factions.ejs', { factions: factions.toJSON(), fName: fName });
    })
    .catch((error) => {
      console.error('Eroare la obținerea factiunilor:', error);

    });
});


app.post('/login', function(req, res, next) {
    var username = req.body.username;
    const md5 = require('md5');
    const password = req.body.password;

    User.forge({ username: username }).fetch().then(function(user) {
        if (!user) {

            res.render('login.ejs', { error: 'Numele de utilizator este greșit, încercați din nou.' });
        } else {
            user = user.toJSON();

           
            const sareBaza = user.salt; 

  
            const saltedPassword = md5(password) + sareBaza;


            const hashedPassword = md5(saltedPassword);


            if (hashedPassword === user.password) {

                sessionEngine = req.session;
                sessionEngine.id = user.id;
                sessionEngine.username = user.username;
                sessionEngine.accID = user.id;
                sessionEngine.accEmail = user.email;
                sessionEngine.accRegisterDate = user.registerdate;
                res.redirect('/');
            } else {

                res.render('login.ejs', { error: 'Parola este greșită, încercați din nou.' });
            }
        }
    });
});
		app.get('/login', function(req, res, next) {



				res.render('login.ejs',{ error : ''});

		});

	
		app.get('/logout', function(req, res, next) {	

	
			req.session.destroy(function(err){
			
			if(err){
			console.log(err);
			}
			else{
			res.redirect('/');
			}

			});
		
		});

};


var is_authenticated = function (req, res, next) {	
	sessionEngine = req.session;
    
    
    if(!sessionEngine.username){
    	return res.redirect('/login');
    }
    next();
};