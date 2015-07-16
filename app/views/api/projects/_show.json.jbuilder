json.(project, :id, :user_id, :category,
  :title, :description, :goal, :deadline,
  :created_at, :image_url, :updated_at)

json.days_left project.days_left
json.days_gone_by project.days_gone_by

json.followers project.followers
json.backers project.backers
json.amountFunded project.amount_funded
