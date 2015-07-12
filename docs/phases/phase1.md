# Phase 1: User Authentication, New Project Form

## Rails
### Models
* User
* Project

### Controllers
* UsersController (create, new)
* SessionsController (create, new, destroy)
* ProjectsController (index, create, new, show)

### Views
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
* projects/index.js [composite root page]
* projects/subcategory_index.js [subview]

* projects/new.js [only view on page]

## Gems/Libraries
