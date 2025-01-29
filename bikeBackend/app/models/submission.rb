class Submission < ApplicationRecord
    validates :first_name, :last_name, :email, :slogan, presence: true
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP, message: "must be a valid email address" }
    validates :slogan, length: { maximum: 50, message: "should not exceed 50 characters" }
end
