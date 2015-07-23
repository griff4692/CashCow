json.(user, :id, :fname, :lname, :email)

json.followedProjects user.followed_projects do |project|
	json.(project, :id, :user_id, :category,
	  :title, :description, :goal, :deadline,
	  :created_at, :updated_at, :days_left)

	json.image_url asset_path(project.image.url)
	json.image_url_thumbnail asset_path(project.image.url(:thumbnail))
end

json.backedProjects user.backed_projects do |project|
	json.(project, :id, :user_id, :category,
		:title, :description, :goal, :deadline,
		:created_at, :updated_at, :days_left)

	json.image_url asset_path(project.image.url)
	json.image_url_thumbnail asset_path(project.image.url(:thumbnail))
end

json.createdProjects user.projects do |project|
	json.(project, :id, :user_id, :category,
		:title, :description, :goal, :deadline,
		:created_at, :days_left, :updated_at)

	json.image_url asset_path(project.image.url)
	json.image_url_thumbnail asset_path(project.image.url(:thumbnail))
end

json.image_url asset_path(user.image.url(:original))
json.image_url_mini asset_path(user.image.url(:mini))
json.image_url_profile asset_path(user.image.url(:profile))
