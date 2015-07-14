class UsersController < ApplicationController
	def new
		@user = User.new
	end

	def create
		@user = User.new(user_params)

		if @user.save
			sign_in!(@user)
			flash[:notice] = "You have successfully signed up!"
			redirect_to new_session_url
		else
			flash.now[:errors] = @user.errors.full_messages
			render :new
		end
	end

	private

	def user_params
		params.require(:user).permit(:email, :password, :image_url)
	end

end
