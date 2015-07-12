# CashCow

[Heroku link][heroku]

[heroku]: http://TBD.herokuapp.com

## Minimum Viable Product
CashCow is a clone of Kickstarter built on Rails and Backbone. Users can:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Create accounts
- [ ] Create sessions (log in)
- [ ] Create projects
- [ ] Back projects
- [ ] Star / follow projects
- [ ] Navigate to profile to view created, backed, and starred projects
- [ ] Reward backers
- [ ] Real-time querying
- [ ] Browse projects by category and sub-criteria

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Project Creation: models and collections (~1 day)
I will create Rails models for users and projects, the latter of which will have functions to handle search criteria.  Require sign in validations in place.

Sign in and sign up will both be rails views on separate pages.

Successful sign in / sign up takes users back to the root Backbone Page.

Before moving on to backbone, I will create a Rails ProjectsController with actions for create, show, and index (based on query criteria).

Start link will take user to a backbone new project form.

Next, I will create backbone project model and projects collection which will leverage the Rails projects controller.

Will ensure that I can create projects in backbone that persist on the database.  Deploy to Heroku!

[Details][phase-one]

### Phase 2: Home Page View galore: homepage with new form and projects by category (1 day)

I will design the homepage to show the top projects by criteria (most popular and best funded for right now).  There will be tabs to toggle between those 2 criteria among each category (movies, art, etc.)

Changing categories on the left will fire off a new request to the index action in the rails projects controller, resulting in swapping subviews based on the results of the query.

In the afternoon, I will write a JQUERY plug-in to handle the search bar in the header. These will be populated dynamically with direct links to the matched projects.

[Details][phase-two]

### Phase 3: Discover and individual project pages (~2 days)

I will create a route called #discover which will house links to all the projects BY category. Clicking on a category link will take add a subview that shows all the projects by that category. #/discover.

The subviews will very simply contain an array of the show subviews for each project (nicely formatted).

To recap: clicking discover creates a new composite view which houses the search criteria, and an index view (which in turn serves as the composite view for the show pages that match the criteria).

Day 2 of phase 3, write a JQUERY plug in to handle scrolling through the thumbnails.  Make sure to leave a full day for this as it must be like silk.

Changing query will change query url string - so if a refresh page happens, backbone will know which index view to display.

[Details][phase-three]

### Phase 4: Backing / Liking Projects (1 day)

I'll start on the Rails side by creating models backing and follow which will represent join tables between users and projects.  Complete associations in Rails.

Next, in the backbone show view, add buttons for pledging and following.  Pledging will be a dynamic form on the page with just an input tag.  Hitting enter will fire off an alert confirming submission as well as a refresh of the project stats on page.

[Details][phase-four]

### Phase 5: Profile Page (1 day)

Now that users can back, create, and follow projects, I can create a complete profile page.  Use toggle plug-in again this time to toggle between backed, created, and followed projects.

[Details][phase-five]

### Phase 6: CSS (2-3 days)
- [ ] Improve and finetune CSS
- [ ] Fine tune everything before moving on to bonus features

### Bonus Features (TBD)
- [ ] Implement rewards and suggested donations (based on rewards)
- [ ] Creation of 'funds' based on investment criteria
- [ ] Implement funding timeline chart on project show pages!
- [ ] Multiple sessions/session management
- [ ] Custom project urls
- [ ] Provide tools for project owners to issue email / page updates to followers and backers

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
[phase-six]: TBD.md
