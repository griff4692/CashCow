json.(user, :id, :fname, :lname, :email, :image_url)

json.followedProjects user.followed_projects
json.backedProjects user.backed_projects
json.createdProjects user.projects
