# == Schema Information
#
# Table name: projects
#
#  id          :integer          not null, primary key
#  user_id     :integer          not null
#  category    :string           not null
#  title       :string           not null
#  description :text             not null
#  goal        :integer          not null
#  deadline    :datetime         not null
#  image_url   :string           not null
#  created_at  :datetime
#  updated_at  :datetime
#

class Project < ActiveRecord::Base
	PROJ_CATEGORIES = %w(Art Music Philanthropy)

	validates :user, :category, :title, :description, :goal, :deadline, presence: true
	validates :title, uniqueness: true
	validates :goal, numericality: { only_integer: true}
	validates :category, inclusion: { in: PROJ_CATEGORIES, message: "Must choose a provided category" }
	validate :deadline_must_be_in_future

	belongs_to :user,
		class_name: "User",
		foreign_key: :user_id,
		primary_key: :id,
		inverse_of: :projects

	has_many :follows,
    class_name: "Follow",
    foreign_key: :project_id,
    primary_key: :id,
    inverse_of: :project,
		dependent: :destroy

	has_many :followers,
		through: :follows,
		source: :follower

	has_many :backings,
		class_name: "Backing",
		foreign_key: :project_id,
		primary_key: :id,
		dependent: :destroy,
		inverse_of: :project

		has_many :backers,
			through: :backings,
			source: :backer

	def days_left
		(self.deadline - Date.tomorrow).to_i
	end

	def days_gone_by
		(Date.today - self.created_at.to_date).to_i
	end

	private

	def deadline_must_be_in_future
		return unless deadline
		if deadline < Date.tomorrow
			errors.add(:deadline, "Cannot be in the future")
		end
	end
end
