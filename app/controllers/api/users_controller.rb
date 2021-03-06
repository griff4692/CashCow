class Api::UsersController < ApplicationController
	def index
		@users = User.all
		render :index
	end

	def show
		@user = User.find(params[:id])
		render :show
	end

	def create
		@user = User.new(user_params)

		if @user.save
			sign_in!(@user)
			render :show
		else
			render json: @user.errors.full_messages, status: :unprocessable_entity
		end
	end

	def destroy
		current_user.destroy!
		render json: { msg: "Successfully Deleted Account" }
	end

	private

	def user_params
		params.require(:user).permit(
			:email,
			:password,
			:image,
			:fname,
			:lname)
	end

end
