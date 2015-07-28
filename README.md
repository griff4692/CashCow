# CashCow

[Cash Cow][Cash Cow]

[Cash Cow]: http://www.cash-cow.io

## Summary description
CashCow is a clone of Kickstarter built on Rails and Backbone.  CashCow is a one page app, only accessing the Rails server through Ajax requests.

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

- Session management via cookies
- Custom authentication which uses BCrypt to store only a secret hash of password by overriding User#password= method
- Third party log-in via Twitter
- Image uploads stored on Amazon S3
- Custom Composite view class extends Backbone's view class to DRY up code and enable dynamic refreshing of content
- Custom parse method in Backbone pre-loads associations to avoid excessive hits to Rails server
- Dynamic user interface with modal, carousel, and tab views, as well as pagination
- Responsive feedback to user mouse events and requests

Features to Add:

- Investment funds
- Suggested donations and suggested projects (personalized)
- Line charts for each project plotting funded status over time
- Multiple session management
- Dynamic querying across project titles / descriptions and usernames
- Using Google Maps Api to scan projects by proximity

## Design Docs
* [DB schema][schema]

[schema]: ./docs/schema.md
