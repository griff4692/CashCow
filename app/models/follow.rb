class Follow < ActiveRecord::Base
  validates :follower, :project, presence: true

  belongs_to :follower,
    class_name: "User",
    foreign_key: :user_id,
    primary_key: :id,
    inverse_of: :follows

  belongs_to :project,
    class_name: "Project",
    foreign_key: :project_id,
    primary_key: :id,
    inverse_of: :follows

end
