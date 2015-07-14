class SessionsController < ApplicationController
	def new
		@user = User.new
	end

	def create
		@user = User.find_by_credentials(
			params[:user][:email], params[:user][:password]
		)

		if @user
			sign_in!(@user)
			flash[:notice] = "You successfully signed in!"
			redirect_to root_url
		else
			flash.now[:errors] = ["Invalid email and/or password"]
			@user = User.new
			render :new
		end
	end

	def destroy
		sign_out!
		redirect_to root_url
	end
end
