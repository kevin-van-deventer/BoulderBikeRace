class RidersController < ApplicationController
    def index
    @riders = Rider.all
    render json: @riders
  end

  def show
    @rider = Rider.find(params[:id])
    if @rider
      render json: @rider
    else
      render json: { error: "Couldn't find Rider" }, status: :not_found
    end
  end

  def create
    @rider = Rider.new(rider_params)
    if @rider.save
      render json: @rider, status: :created
    else
      error_messages = @rider.errors.full_messages
      render json: { errors: error_messages }, status: :unprocessable_entity
    end
  end

  private

  def rider_params
    params.require(:rider).permit(:first_name, :last_name, :city, :latitude, :longitude)
  end

end
