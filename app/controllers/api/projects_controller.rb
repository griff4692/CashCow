class Api::ProjectsController < ApplicationController
	# def new
	# 	@project = Project.new
	# end

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

end
