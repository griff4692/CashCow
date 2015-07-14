class Api::ProjectsController < ApplicationController
	before_action :require_signed_in, except: :show

	def index
		@projects = Project.all
		render :index
	end

	def create
		@project = current_user.projects.new(project_params)

		if @project.save
			render :show
		else
			render json: @project.errors.full_messages, status: :unprocessable_entity
		end
	end

	def show
		@project = Project.find(params[:id])

		render :show
	end

	def update

	end

	def destroy

	end

	private

	def project_params
		params.require(:project).permit(:category, :title, :description, :deadline, :goal, :image_url)
	end

	def require_signed_in
		redirect_to new_session_url unless signed_in?
	end

end
