class SubmissionsController < ApplicationController
    def index
      @submissions = Submission.all
      render json: @submissions
    end
  
    def show
      @submission = Submission.find_by(id: params[:id])
      if @submission
        render json: @submission
      else
        render json: { error: "Couldn't find Submission" }, status: :not_found
      end
    end
  
    def create
      @submission = Submission.new(submission_params)
      if @submission.save
        render json: @submission, status: :created
      else
        render json: { errors: @submission.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    private
  
    def submission_params
      params.require(:submission).permit(:first_name, :last_name, :email, :slogan)
    end
  end