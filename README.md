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
- [ ] Browse projects by category
- [ ] Sort within category by certain criteria

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Project Creation (~1 day)
Root page will be a Backbone page with a header for project discovery, creation, Sign in, and Sign up. (Body will eventually contain search category and criteria - defaulted to everything at first)

Sign in and sign up will both be rails views on separate pages.

Successful sign in / sign up takes users back to the root Backbone Page.

Start link will take user to a backbone new project form.

[Details][phase-one]

### Phase 2: Viewing homepage with search query results (1 day)

I will design the homepage to allow the user to show all projects by category (tbd) and subcategory (magic, popularity, newest, end date, most funded). The homepage will consist of the header, a composite view display the current search criteria, as well as an empty div for the 3 subcategories: staff picks, most popular, and closest to end date.

To do so, I will first create a project model and collection in Backbone.

Changing categories on the right will fire off a search query, and will result in swapping subviews based on the results of the query.

[Details][phase-two]

### Phase 3: Editing and Displaying Posts (~2 days)
I plan to use third-party libraries to add functionality to the `PostForm` and
`PostShow` views in this phase. First I'll need to add a Markdown editor to the
`PostForm`, and make sure that the Markdown is properly escaped and formatted in
the `PostShow` view. I also plan to integrate Filepicker for file upload so
users can add images to blog posts.

[Details][phase-three]

### Phase 4: User Feeds (~1-2 days)
I'll start by adding a `feed` route that uses the `current_user`'s
`subscribed_blogs` association to serve a list of blog posts ordered
chronologically. On the Backbone side, I'll make a `FeedShow` view whose `posts`
collection fetches from the new route.  Ultimately, this will be the page users
see after logging in.

[Details][phase-four]

### Phase 5: Searching for Blogs and Posts (~2 days)
I'll need to add `search` routes to both the Blogs and Posts controllers. On the
Backbone side, there will be a `SearchResults` composite view has `BlogsIndex`
and `PostsIndex` subviews. These views will use plain old `blogs` and `posts`
collections, but they will fetch from the new `search` routes.

[Details][phase-five]

### Bonus Features (TBD)
- [ ] Custom project urls
- [ ] Pagination/infinite scroll
- [ ] User avatars
- [ ] Creation of 'funds' based on investment criteria
- [ ] Receive email alerts regarding starred and/or backed projects
- [ ] Multiple sessions/session management

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
