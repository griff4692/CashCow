class Api::BackingsController < ApplicationController

  def create
    @backing = current_user.backings.new(backing_params)

    if @backing.save
      render json: {
        fund_date: Date.today,
        amount: @backing.amount
       }
    else
      render json: @backing.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @backing = Backing.find(params[:id])

    @backing.destroy!
    render json: { msg: "Successfully removed your funding of this project.  Your account will be reimbursed!"}
  end

  def backing_params
    params.require(:backing).permit(:project_id, :amount)
  end

end
