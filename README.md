![image](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)

# GA WDI-32 Project 2 - DC Database

For some years I've been interested in comic books, especially DC Comics. For my second GA project, I set out to make an application where people can register, login and rate graphic novel, review them (which are moderated by an admin) and favourite them.

DC Database is a full-stack, RESTful Express app built using Node.js, MongoDB, JavaScript, EJS, SCSS and Bulma. It has been designed with mobile in mind and is fully responsive.

##### [Visit website](https://dc-database-project.herokuapp.com/).

*Please be aware that Heroku apps go to sleep after 30 mins of inactivity and may take a little time to load*

---
<p align="center"><img src="https://i.imgur.com/tzryQ3O.jpg" width="700"></p>

###### Users create an account on DC Database, a painless process that allows them to view the graphic novels and characters, add new graphic novels. Passwords are hashed with bcrypt.


###### Once logged in, the user is redirected to the home page. It presents them with a choice of what they want to do, whether that's reviewing graphic novels, adding characters or graphic novels or reviewing them.

<p align="center"><img src="https://i.imgur.com/f9J7rtS.png" width="700"></p>


<p align="center"><img src="https://i.imgur.com/3qGAXvd.png" width="700"></p>

###### Users can also filter the graphic novels by the writer and the characters by their status whether that's Hero, Villain or Anti-Hero.

<p align="center"><img src="https://i.imgur.com/UBtmtN8.png" width="700"></p>

###### The user can add a title to their rating, some text and a star rating. Once rated it'll calculate the average rating of all users.

---

As my mission was to build my first RESTful app, I was very pleased with the way DC Database worked out and it is something that I would love to develop further in the future. My ideas for further expansion include:

- The ability to see which characters appear in which graphic novels and vice versa
- The implementation of AJAX (not yet learned at time of build) to negate the need for regular page loads.
