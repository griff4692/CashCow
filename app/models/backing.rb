# == Schema Information
#
# Table name: backings
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  project_id :integer          not null
#  amount     :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Backing < ActiveRecord::Base
  validates :project_id, :user_id, :amount, presence: true
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
