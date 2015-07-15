class Backing < ActiveRecord::Base
  validates :backer, :project, :amount, presence: true
  validates :amount, numericality: { only_integer: true }

  belongs_to :backer,
    class_name: "User",
    foreign_key: :user_id,
    primary_key: :id,
    inverse_of: :backings

  belongs_to :project,
    class_name: "Project",
    foreign_key: :project_id,
    primary_key: :id,
    inverse_of: :backings

end
