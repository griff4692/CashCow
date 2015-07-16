class Api::SessionsController < ApplicationController
	def show
    if current_user
      render :show
    else
      render json: {}
    end
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
      head :unprocessable_entity
		end
	end

	def destroy
		sign_out!
	  render json: {}
	end

	def omniauth
		user = User.find_or_create_by_auth_hash(auth_hash)
		sign_in!(user)
		redirect_to root_url
	end

	protected

	def auth_hash
		request.env['omniauth.auth']
	end
end
