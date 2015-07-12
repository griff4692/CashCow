# Phase 1: User Authentication, New Project Form

## Rails
### Models
* User
* Project

### Controllers
* UsersController (create, new)
* SessionsController (create, new, destroy)
* API::ProjectsController (all resources)

### Views
* header helper (put into application views)
* users/new.html.erb
* session/new.html.erb
* api/projects/index.jbuilder.json
* api/projects/show.jbuilder.json

## Backbone
### Models
* Project

### Collections
* Projects

### Views
* projects/new.js [only view on this url page '/#/projects/new')

## Gems/Libraries
