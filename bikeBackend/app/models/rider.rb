class Rider < ApplicationRecord
    validates :first_name, :last_name, :city, presence: true
    validates :latitude, :longitude, numericality: true
end
