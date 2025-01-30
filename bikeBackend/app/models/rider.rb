

class Rider < ApplicationRecord

    before_save :sanitize_inputs

    private

    def sanitize_inputs
    self.first_name = ActionController::Base.helpers.sanitize(first_name)
    self.last_name = ActionController::Base.helpers.sanitize(last_name)
    self.city = ActionController::Base.helpers.sanitize(city)
    end

    validates :first_name, :last_name, :city, presence: true
    validates :latitude, :longitude, numericality: true

    validates :first_name, :last_name, :city, format: { 
    with: /\A[a-zA-Z\s]+\z/, 
    message: "only allows letters and spaces" 
  }

end
