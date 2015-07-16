class FollowsController < ApplicationController
  before_action :require_signed_in!

  def create
    @follow = current_user.follows.new(follow_params)

    if @follow.save
      render json: "Successful destroy"
    else
			render json: @project.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @follow = Follow.get(id)
    if @follow
      @follow.destroy();
      render json: "Successful destroy"
    else
      render json: "Project doesn't exist!", status: :unprocessable_entity
    end

  end

  private

  def follow_params
    params.require(:follow).permit(:project_id)
  end
end