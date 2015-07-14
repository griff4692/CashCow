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
#

class User < ActiveRecord::Base
	attr_reader :password

	validates :email, :password, :session_token, presence: true
	validates :password, length: { minimum: 5, allow_nil: true }
	validates :email, uniqueness: true

	after_initialize :ensure_session_token

	def self.find_by_credentials(email, password)
		user = User.find_by_email(email)

		user.is_password?(password) ? user : nil
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
