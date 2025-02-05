require 'test_helper'

class RidersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @rider = Rider.create!(first_name: "John", last_name: "Doe", city: "New York", latitude: 40.7128, longitude: -74.0060)
  end

  test "should get index" do # checks all riders
    get riders_url
    assert_response :success
    json_response = JSON.parse(@response.body)
    assert json_response.is_a?(Array), "Response should be an array"
    assert_not_empty json_response, "Response should contain riders"
  end

  test "should show rider" do # shows a single rider
    get rider_url(@rider)
    assert_response :success
    json_response = JSON.parse(@response.body)
    assert_equal @rider.id, json_response["id"], "Rider ID should match"
    assert_equal @rider.first_name, json_response["first_name"], "Rider first name should match"
    assert_equal @rider.last_name, json_response["last_name"], "Rider last name should match"
    assert_equal @rider.city, json_response["city"], "Rider city should match"
    assert_equal @rider.latitude, json_response["latitude"], "Rider latitude should match"
    assert_equal @rider.longitude, json_response["longitude"], "Rider longitude should match"
  end

  test "should return 404 if rider not found" do
    get rider_url(-1), as: :json # Non-existing ID
    assert_response :not_found
    json_response = JSON.parse(@response.body)
    assert_equal "Not Found", json_response["error"], "Error message should be correct"
  end
end