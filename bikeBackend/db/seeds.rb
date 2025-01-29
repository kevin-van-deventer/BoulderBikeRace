# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
Rider.destroy_all

riders = [
  { first_name: 'Dustin', last_name: 'Green', city: 'Hickory Hills', latitude: 40.00, longitude: -105.35 },
  { first_name: 'Jason', last_name: 'Finn', city: 'Huntington Beach', latitude: 39.95, longitude: -105.24 },
  { first_name: 'Howard', last_name: 'Thompson', city: 'Hale', latitude: 40.06, longitude: -105.26 },
  { first_name: 'Maggie', last_name: 'Lantz', city: 'Dublin', latitude: 40.03, longitude: -105.23 },
  { first_name: 'Lawrence', last_name: 'Duran', city: 'Fort Myers', latitude: 40.04, longitude: -105.23 },
  { first_name: 'Irene', last_name: 'Molina', city: 'Tucson', latitude: 39.96, longitude: -105.22 },
  { first_name: 'Nancy', last_name: 'Garner', city: 'Baltimore', latitude: 39.98, longitude: -105.21 },
  { first_name: 'Tara', last_name: 'Taylor', city: 'Minneapolis', latitude: 40.00, longitude: -105.25 },
  { first_name: 'Alejandro', last_name: 'Smith', city: 'Scarborough', latitude: 40.02, longitude: -105.26 },
  { first_name: 'Tricia', last_name: 'Renshaw', city: 'Mystic', latitude: 40.02, longitude: -105.30 },
  { first_name: 'Travis', last_name: 'Cook', city: 'Twin Lakes', latitude: 40.01, longitude: -105.20 },
  { first_name: 'Joan', last_name: 'Brooks', city: 'Norfolk', latitude: 39.98, longitude: -105.24 },
  { first_name: 'Joseph', last_name: 'Rodgers', city: 'Wayne', latitude: 39.99, longitude: -105.25 },
  { first_name: 'Matthew', last_name: 'Gregson', city: 'Brashear', latitude: 40.01, longitude: -105.29 },
  { first_name: 'Katie', last_name: 'Dunlap', city: 'Marion', latitude: 39.97, longitude: -105.27 },
  { first_name: 'Leo', last_name: 'Howard', city: 'Dallas', latitude: 39.97, longitude: -105.33 },
  { first_name: 'Maria', last_name: 'Baisden', city: 'Raleigh', latitude: 40.00, longitude: -105.29 },
  { first_name: 'Sandy', last_name: 'Townsend', city: 'Newport', latitude: 40.05, longitude: -105.30 },
  { first_name: 'Melinda', last_name: 'Stephenson', city: 'Kahului', latitude: 39.99, longitude: -105.31 },
  { first_name: 'Jason', last_name: 'Nichols', city: 'Alexandria', latitude: 40.01, longitude: -105.32 }
]

Rider.create!(riders)

puts "#{Rider.count} riders have been created!"


# Seeder data for Slogan Submissions
# Clear existing data
Submission.destroy_all

# Create 5 seed records
submissions = [
  { first_name: "Alice", last_name: "Smith", email: "alice@example.com", slogan: "Ride the wind!" },
  { first_name: "Bob", last_name: "Johnson", email: "bob@example.com", slogan: "Bike for life." },
  { first_name: "Charlie", last_name: "Brown", email: "charlie@example.com", slogan: "Pedal your way to freedom!" },
  { first_name: "Diana", last_name: "Prince", email: "diana@example.com", slogan: "Two wheels, endless possibilities." },
  { first_name: "Ethan", last_name: "Hunt", email: "ethan@example.com", slogan: "Cycling dreams start here." }
]

submissions.each do |submission|
  Submission.create!(submission)
end

puts "Seeded #{submissions.count} submissions!"