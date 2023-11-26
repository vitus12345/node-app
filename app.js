
const Joi = require('joi')
const config = require('config')
const express = require('express');
const app = express();
// const logger = require('./logger')
const helmet = require('helmet');
const morgan = require('morgan')
const startupDebugger = require('debug')('app:startup');
// const dbDebugger = require('debug')('ap:db')



app.use(express.json()) // this is a middleware
app.use(express.urlencoded({extended: true}))
app.use(express.static('public')) 
app.use(helmet())
console.log('Application Name' + config.get('name'));
console.log('Mail Server' + config.get('mail.host'));
// console.log('Mail Password' + config.get('mail.password'));
// dbDebugger('connected to database...');


if(app.get('env')=== 'development'){
    app.use(morgan('tiny'));
    startupDebugger('Morgan Enabled...');
}


console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
console.log(`app: ${app.get('env')}`)




app.use(function(req, res, next){
    console.log("Login...");
    next();  

})


app.use(function(req, res, next){
    console.log("Authentication...");
    next();  

})
// app.use(logger)
 

const courses =[
    {id:1, name:"html"},
    {id:2, name:"css"},
    {id:3, name:"javascript"},

]

// app.get('/api/posts/:year/:month', (req, res) => {
//    res.send(req.query)
// });

 app.get('/api/courses/', (req, res) => {
         res.send(courses)
     });


     app.get('/api/courses/:id', (req, res) => {
        const course = courses.find(c => c.id === parseInt(req.params.id));

        if (!course) return res.status(404).send("the course with the id not found");

        const {error} = validateCourse(req.body) 

        if(error) return res.status(400).send(error.details[0].message);

        res.send(course);
    });



// app.get('/api/courses/:id', (req, res) => {



//     res.send(req.params.id)
//  });

  app.post('/api/courses/', (req, res) => {
   
    const {error} = validateCourse(req.body) 

    if(error) return res.status(400).send(error.details[0].message);

            const course = {
            id: courses.length + 1,
            name: req.body.name
        }; 
   
        courses.push(course);
          res.send(courses)
    }); 

    //   app.put('/api/courses/:id', (req, res) =>{
    //     const course = courses.find(c => c.id === parseInt(req.params.id));
    //     if(!course) res.status(404).send("the course with the id not found");

    //          const schema = {
    //              name:Joi.string().min(3).required()
    //              }; 
    //              const result = Joi.validate(req.body, schema)
            
    //              if(result.error){
    //                  res.status(400).send(result.error.details[0].message)
    //                  return ;
    //             }
 
    //             course.name = req.body.name
    //             res.send(course)
    //   });

     app.put('/api/courses/:id', (req, res) =>{
            const course = courses.find(c => c.id === parseInt(req.params.id));

            if(!course) return res.status(404).send("the course with the id not found");

            
                const {error} = validateCourse(req.body)
            
                 if(error) return res.status(400).send(error.details[0].message);
                    
 
                course.name = req.body.name
                res.send(course) 
        });



        app.delete('/api/courses/:id', (req, res) =>{
            const course = courses.find(c => c.id === parseInt(req.params.id));

            if(!course) return res.status(404).send("the course with the id not found");

            const index = courses.indexOf(course);
            courses.splice(index,1);

                // const {error} = validateCourse(req.body)
            
                //  if(error){
                //       res.status(400).send(error.details[0].message)
                //      return ;
                //     }
 
                // course.name = req.body.name
                res.send(course) 
        });



function validateCourse(course){
    const schema ={
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema)
}

const port = process.env.PORT || 3000;

app.listen(port, () => {console.log(`listening on port ${port}...`)});
