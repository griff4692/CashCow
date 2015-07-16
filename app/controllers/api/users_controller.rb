class Api::UsersController < ApplicationController
	def index
		@users = User.all
		render :index
	end

	def create
		@user = User.new(user_params)

		if @user.save
			sign_in!(@user)
			flash[:notice] = "You have successfully signed up!"
			redirect_to root_url
		else
			flash.now[:errors] = @user.errors.full_messages
			render :new
		end
	end

	private

	def user_params
		params.require(:user).permit(
			:email,
			:password,
			:image_url,
			:fname,
			:lname)
	end

end
