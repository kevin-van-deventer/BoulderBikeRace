class Submission < ApplicationRecord
    before_validation :sanitize_inputs
  
    VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  
    validates :first_name, :last_name, :email, :slogan, presence: true
    validates :email, format: { with: VALID_EMAIL_REGEX, message: "must be a valid email address" }
    validates :slogan, length: { maximum: 50, message: "should not exceed 50 characters" }
    validates :first_name, :last_name, :slogan, format: { 
      with: /\A[a-zA-Z\s]+\z/, 
      message: "only allows letters and spaces" 
    }
  
    private
  
    def sanitize_inputs
      self.first_name = ActionController::Base.helpers.sanitize(first_name)
      self.last_name = ActionController::Base.helpers.sanitize(last_name)
      self.slogan = ActionController::Base.helpers.sanitize(slogan)
    end
  end
  