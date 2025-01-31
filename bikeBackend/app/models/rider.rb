

class Rider < ApplicationRecord

    before_save :sanitize_inputs

    validates :first_name, :last_name, :city, presence: true
    validates :latitude, :longitude, presence: true, numericality: { greater_than_or_equal_to: -90, less_than_or_equal_to: 90 }
    validates :longitude, numericality: { greater_than_or_equal_to: -180, less_than_or_equal_to: 180 }

    validates :first_name, :last_name, :city, format: { 
    with: /\A[a-zA-Z\s]+\z/, 
    message: "only allows letters and spaces" 
  }
  private

  def sanitize_inputs
    self.first_name = ActionController::Base.helpers.sanitize(first_name).strip
    self.last_name = ActionController::Base.helpers.sanitize(last_name).strip
    self.city = ActionController::Base.helpers.sanitize(city).strip
  end

end
