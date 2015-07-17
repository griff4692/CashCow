# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  image_url       :string
#  created_at      :datetime
#  updated_at      :datetime
#  fname           :string
#  lname           :string
#  provider        :string
#  uid             :string
#

class User < ActiveRecord::Base
	attr_reader :password

	validates :email, :fname, :lname, :session_token, presence: true
	validates :password, length: { minimum: 5, allow_nil: true }
	validates :email, uniqueness: true

	after_initialize :ensure_session_token

	has_many :projects,
		class_name: "Project",
		foreign_key: :user_id,
		primary_key: :id,
		inverse_of: :user,
		dependent: :destroy

	has_many :follows,
    class_name: "Follow",
    foreign_key: :user_id,
    primary_key: :id,
    inverse_of: :follower,
		dependent: :destroy

	has_many :followed_projects,
		through: :follows,
		source: :project

	has_many :backings,
		class_name: "Backing",
		foreign_key: :user_id,
		primary_key: :id,
		dependent: :destroy,
		inverse_of: :backer

	has_many :backed_projects,
		through: :backings,
		source: :project

	def self.find_by_credentials(email, password)
		user = User.find_by_email(email)
		return nil unless user
		user.is_password?(password) ? user : nil
	end

	def self.find_or_create_by_auth_hash(auth_hash)
		user = User.find_by(
			provider: auth_hash[:provider],
			uid: auth_hash[:uid])

		unless user
			user = User.create!(
						provider: auth_hash[:provider],
						uid: auth_hash[:uid],
						fname: auth_hash[:info][:name].split.first,
						lname: auth_hash[:info][:name].split.last,
						email: "cash_cow@cash-cow.com",
						password: SecureRandom::urlsafe_base64,
						image_url: auth_hash[:info][:image]
						)
		end
		
		user
	end

	def password=(password)
		@password = password
		self.password_digest = BCrypt::Password.create(password)
	end

	def is_password?(password)
		BCrypt::Password.new(self.password_digest).is_password?(password)
	end

	def reset_token!
		self.session_token = SecureRandom.urlsafe_base64(16)
		self.save!
		self.session_token
	end

	protected

	def ensure_session_token
		self.session_token ||= SecureRandom.urlsafe_base64(16)
	end

end
