#building the response through smart queries
backings_info = project.backers_with_amounts_and_total_funding
followers_info = project.followers_with_total

json.(project, :id, :user_id, :category,
  :title, :description, :goal, :deadline,
  :created_at, :image_url, :updated_at)

json.days_left project.days_left


if include_details
  json.followers followers_info['followers']
  json.backers_with_amounts backings_info['backers']
end
