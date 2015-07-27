# CashCow

[Cash Cow][Cash Cow]

[Cash Cow]: http://www.cash-cow.io

## Summary description
CashCow is a clone of Kickstarter built on Rails and Backbone.  CashCow is fully a one page app, accessing the Rails server via Ajax requests.

Users:

- Can create and delete accounts
- Can create projects
- Can back projects
- Can follow projects
- Can create sessions (log-in)
  - Are prompted to sign in via full screen modal if attempting to do any of the above CRUD actions without an active session
- Can navigate to profile view to view created, backed, and starred project tabs
- Can browse projects via discovery page by category and sub-criteria (with pagination)
  - Full screen modal allows user to easily select from available filters and orders

Features:

- Session management
- Single page app with dynamic content refreshing
- Password and cookie encryption
- Pagination
- OmniAuth with Twitter
- Modal, carousel, and tab content
- Dynamic responses to user interactions via Javascript and CSS

Features to Add:

- Investment funds
- Suggested donations and suggested projects (personalized)
- Line charts for each project plotting funded status over time
- Multiple session management
- Dynamic querying across project titles / descriptions and usernames
- Using Google Maps Api to scan projects by proximity

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md
