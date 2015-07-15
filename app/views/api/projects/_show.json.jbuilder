json.(project, :id, :user_id, :category,
  :title, :description, :goal, :deadline,
  :created_at)

json.days_left project.days_left
json.days_gone_by project.days_gone_by
