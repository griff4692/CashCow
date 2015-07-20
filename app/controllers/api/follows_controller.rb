class Api::FollowsController < ApplicationController

  def create
    @follow = current_user.follows.new(follow_params)

    if @follow.save
      render json: {msg: "Successful create" }
    else
			render json: @follow.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @follow = Follow.find_by(
      project_id: params[:follow][:project_id],
      user_id: params[:id]
      );

    if @follow
      @follow.destroy();
      print 'successful destroy on server'
      render json: @follow
    else
      print 'unsuccessful destroy on server'
      render json: ["doesnt exist"], status: :unprocessable_entity
    end
  end

  protected

  def follow_params
    params.require(:follow).permit(:project_id)
  end
end
