class Api::FollowsController < ApplicationController

  def create
    @follow = current_user.follows.new(follow_params)

    if @follow.save
      render json: "Successful create"
    else
			render json: @follow.errors.full_messages, status: :unprocessable_entity
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

  protected

  def follow_params
    params.require(:follow).permit(:project_id)
  end
end
