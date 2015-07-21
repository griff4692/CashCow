json.(user, :id, :fname, :lname, :email)

json.followedProjects user.followed_projects
json.backedProjects user.backed_projects
json.createdProjects user.projects
json.image_url asset_path(user.image.url(:original))
json.image_url_mini asset_path(user.image.url(:mini))
json.image_url_profile asset_path(user.image.url(:profile))
