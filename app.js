const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
// const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/newRenderer");



//Call deafault team manager function
createManager();
//array that will hold all employee objects
let teamMembers = [];
//object that will hold all employee id numbers, this will be used to check the uniqueness of employee id's
const idNumbers = {};


//function to create manager
function createManager(){
    console.log("Let's build your team!")
inquirer
  .prompt([
    {
      type: "input",
      message: "What is your team manager's name?",
      name: "name"
    },
    {
      type: "input",
      message: "What is your manager's id?",
      name: "id"
  },
    {
      type: "input",
      message: "What is your manager's email?",
      name: "email",
      //email validation
      validate: function (email) {
        valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
        if (valid) {
            return true;
        } else {
            console.log("  Please enter a valid email")
            return false;
        }
    }
    },
    {
      type: "input",
      message: "What is your manager's office number?",
      name: "officeNumber"
    }
  ])
.then( response => {
    const manager = new Manager(response.name, response.id, response.email, response.officeNumber);
    //push the new manager object to the teamMembers array
    teamMembers.push(manager);
    idNumbers[response.id]=true;
    addEmployee();
  });

}

// prompt to check what type of employee role user would like to add
function addEmployee(){
  inquirer
  .prompt([
    {
      type: "list",
      message: "What kind of team member would you like to add?",
      name: "role",
      choices: [
          "Engineer",
          "Intern",
          "I do not want to add any more team members"
      ]
    }
  ])
  //run corresponding functions to create employee objects according to user choice
.then( response => {
    switch(response.role) {
    case "Engineer":
        addEngineer();
        break;
    case "Intern":
        addIntern();
        break;
    //if user chooses not to add any more team members, render the created employee objects onto a new output.html page
    case "I do not want to add any more team members":
        console.log(teamMembers);
        fs.writeFile("output.html", render(teamMembers), function(err){
            if (err) {
                return console.log(err);
              }            
        });
        break;
    }
  });
}


//function to build an engineer
function addEngineer(){
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is your engineer's name?",
          name: "name"
        },
        {
          type: "input",
          message: "What is your engineer's id?",
          name: "id",
          validate: function (userIdNumber) {    
            console.log(idNumbers);
            console.log(userIdNumber);
              const taken = idNumbers[userIdNumber];
              console.log("is taken: " + taken);
              console.log("This id is invalid, please make sure the id is correct.")
              return !taken;
        }
    
        },
        {
          type: "input",
          message: "What is your engineer's email?",
          name: "email",
          validate: function (email) {
  
            valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    
            if (valid) {
                return true;
            } else {
                console.log("  Please enter a valid email")
                return false;
            }
        }    
        },
        {
          type: "input",
          message: "What is your engineer's GitHub account?",
          name: "github"
        }
      ])
    .then( response => {
        const engineer = new Engineer(response.name, response.id, response.email, response.github);
        console.log("Engineer successfully added!")
        //push the created engineer object into the teamMembers array
        teamMembers.push(engineer);
        idNumbers[response.id]=true;
        //ask if user wantes to add another employee
        addEmployee();
      })
}

//function to build an intern
function addIntern(){
    inquirer
    .prompt([
      {
        type: "input",
        message: "What is your intern's name?",
        name: "name"
      },
      {
        type: "input",
        message: "What is your intern's id?",
        name: "id",
        //id validation
        validate: function (userIdNumber) {    
          console.log(idNumbers);
          console.log(userIdNumber);
            const taken = idNumbers[userIdNumber];
            console.log("is taken: " + taken);
            console.log("This id is invalid, please make sure the id is correct.")
            return !taken;

      }
    },
      {
        type: "input",
        message: "What is your intern's email?",
        name: "email",
        //email validation
        validate: function (email) {
          valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
          if (valid) {
              return true;
          } else {
              console.log(".  Please enter a valid email")
              return false;
          }
      }
      },
      {
        type: "input",
        message: "What is your intern's school?",
        name: "school"
      }
    ])
  .then( response => {
      const intern = new Intern(response.name, response.id, response.email, response.school);
      console.log("Intern successfully added!");
      //push the newly created intern into the teamMembers array
      teamMembers.push(intern);
      idNumbers[response.id]=true;
      addEmployee();
    });

}


