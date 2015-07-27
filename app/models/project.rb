# == Schema Information
#
# Table name: projects
#
#  id                 :integer          not null, primary key
#  user_id            :integer          not null
#  category           :string           not null
#  title              :string           not null
#  description        :text             not null
#  goal               :integer          not null
#  deadline           :date             not null
#  created_at         :datetime
#  updated_at         :datetime
#  image_file_name    :string
#  image_content_type :string
#  image_file_size    :integer
#  image_updated_at   :datetime
#

class Project < ActiveRecord::Base

	PROJ_CATEGORIES = %w(Art Music Philanthropy)

	validates :user, :category, :title, :description, :goal, :deadline, presence: true
	validates :title, uniqueness: true
	validates :goal, numericality: { only_integer: true}
	validates :category, inclusion: { in: PROJ_CATEGORIES, message: "Must choose a provided category" }
	validate :deadline_must_be_in_future

	has_attached_file :image, styles: {
		thumbnail: '280x200>',
		highlight: '960x770>',
		detail: '550x390>'
		}, default_url: 'logo.png'
	validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

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

	def followers_with_total
		follows = self.follows.includes(:follower)
		followers_with_total = {}

		followers_with_total['total'] = follows.length
		followers_with_total['followers'] = []

		follows.each do |follow|
			followers_with_total['followers'] << follow.follower
		end

		followers_with_total
	end

	def pledged
		self.backings.sum(:amount)
	end

	def backers_with_amounts_and_total_funding
		backings = self.backings.includes(:backer)

		backers_with_amounts_and_total_funding = {}
		backers_with_amounts_and_total_funding['total'] = 0
		backers_with_amounts_and_total_funding['num_backers'] = 0
		backers_with_amounts_and_total_funding['backers'] = []

		backings.each do |backing|
			backers_with_amounts_and_total_funding['total'] += backing.amount
			backers_with_amounts_and_total_funding['backers'] <<
			 [backing.backer, backing.amount, backing.created_at, backing.id]
			backers_with_amounts_and_total_funding['num_backers'] += 1
		end

		backers_with_amounts_and_total_funding
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
