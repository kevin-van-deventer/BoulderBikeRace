class Api::RidersController < ApplicationController
  before_action :set_rider, only: %i[ show update destroy ]

  # GET /riders
  def index
    @riders = Rider.all

    render json: @riders
  end

  # GET /riders/1
  def show
    render json: @rider
  end

  # POST /riders
  def create
    @rider = Rider.new(rider_params)

    if @rider.save
      render json: @rider, status: :created, location: @rider
    else
      render json: @rider.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /riders/1
  def update
    if @rider.update(rider_params)
      render json: @rider
    else
      render json: @rider.errors, status: :unprocessable_entity
    end
  end

  # DELETE /riders/1
  def destroy
    @rider.destroy!
  end

  private
    def set_rider
      @rider = Rider.find(params.expect(:id))
    end

    def rider_params
      params.require(:rider).permit(:first_name, :last_name, :city, :latitude, :longitude)
    end
end
