# test/security/riders_security_test.rb
require "test_helper"

class RidersSecurityTest < ActionDispatch::IntegrationTest
  setup do
    Rider.delete_all # Ensure a clean test database
  end

  test "should prevent SQL injection in rider creation" do
    post api_riders_url, params: { rider: {
      first_name: "Robert'); DROP TABLE riders;--",
      last_name: "Hacker",
      city: "HackedCity",
      latitude: 40.7128,
      longitude: -74.0060
    }}
    
    assert_response :unprocessable_entity
    assert Rider.count == 0, "Database should not be affected by SQL injection"
  end

  test "should prevent XSS attacks in rider input" do
    post api_riders_url, params: { rider: {
      first_name: "<script>alert('XSS');</script>",
      last_name: "User",
      city: "CityXSS",
      latitude: 40.7128,
      longitude: -74.0060
    }}
  
    assert_response :unprocessable_entity # Change from :created to :unprocessable_entity
    json_response = JSON.parse(@response.body)
    assert_includes json_response["first_name"], "only allows letters and spaces", "XSS should be blocked by input validation"
  end

  test "should prevent invalid data from being saved" do
    post api_riders_url, params: { rider: {
      first_name: "",
      last_name: "",
      city: "",
      latitude: "invalid",
      longitude: "invalid"
    }}
    
    assert_response :unprocessable_entity
    json_response = JSON.parse(@response.body)

    puts "Debug: Response JSON => #{json_response.inspect}" unless json_response["errors"]

    assert json_response["errors"].is_a?(Array), "Errors should be an array"
    assert_includes json_response["errors"], "First name can't be blank", "Should validate presence of first name"
    assert_includes json_response["errors"], "Last name can't be blank", "Should validate presence of last name"
    assert_includes json_response["errors"], "City can't be blank", "Should validate presence of city"
    assert_includes json_response["errors"], "Latitude is not a number", "Should validate latitude format"
    assert_includes json_response["errors"], "Longitude is not a number", "Should validate longitude format"
  end
end
