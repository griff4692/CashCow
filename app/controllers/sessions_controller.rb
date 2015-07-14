class SessionsController < ApplicationController
	def new; end

	def create
		@user = User.find_by_credentials(
			params[:user][:email], params[:user][:password]
		)

		if @user
			sign_in!(@user)
			redirect_to new_user_url
		else
			flash.now[:errors] = ["Invalid email and/or password"]
			render :new
		end
	end

	def destroy
		sign_out!
		redirect_to root_url
	end
end
