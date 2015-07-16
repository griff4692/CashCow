class BackingsController < ApplicationController
  before_action :require_signed_in!

  def create
  end

  def update

  end

  def destroy

  end

  def backing_params
    params.require(:backing).permit(:project_id, :amount)
  end

end
