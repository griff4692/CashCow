# == Schema Information
#
# Table name: follows
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  project_id :integer          not null
#

class Follow < ActiveRecord::Base
  validates :user_id, :project_id, presence: true
  validates :user_id, uniqueness: { scope: :project_id }

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
