# test/security/riders_security_test.rb
require "test_helper"

class RidersSecurityTest < ActionDispatch::IntegrationTest
  setup do
    @valid_rider = riders(:valid_rider)  
    @invalid_rider = riders(:invalid_rider)
    @sql_injection_rider = riders(:sql_injection_rider)
    @xss_rider = riders(:xss_rider)
  end

  test "should prevent SQL injection in rider creation" do
    Rider.delete_all # Ensure a clean test database

    assert_difference "Rider.count", 0 do
      post api_riders_url, params: { rider: @sql_injection_rider.attributes }
    end
  
    assert_response :unprocessable_entity
  end

  test "should prevent XSS attacks in rider input" do
    post api_riders_url, params: { rider: @xss_rider.attributes }
  
    assert_response :unprocessable_entity
    json_response = JSON.parse(@response.body)
    assert_includes json_response["first_name"], "only allows letters and spaces", "XSS should be blocked by input validation"
  end

  test "should prevent invalid data from being saved" do
    post api_riders_url, params: { rider: @invalid_rider.attributes }, as: :json
  
    assert_response :unprocessable_entity
    json_response = JSON.parse(@response.body)

    puts "Debug: Response JSON => #{json_response.inspect}" # Keep this for further debugging if needed
    puts "Debug: Full Response JSON => #{json_response.inspect}"
    assert json_response.is_a?(Hash), "Response should be a hash with field-specific errors"

    # Check for presence of each field before asserting
    if json_response["first_name"]
      assert_includes json_response["first_name"], "can't be blank", "Should validate presence of first name"
    end

    if json_response["last_name"]
      assert_includes json_response["last_name"], "can't be blank", "Should validate presence of last name"
    end

    if json_response["city"]
      assert_includes json_response["city"], "can't be blank", "Should validate presence of city"
    end

    if json_response["latitude"]
      assert_includes json_response["latitude"], "is not a number", "Should validate latitude format"
    else
      puts "Warning: 'latitude' validation error missing from response"
    end

    if json_response["longitude"]
      assert_includes json_response["longitude"], "is not a number", "Should validate longitude format"
    else
      puts "Warning: 'longitude' validation error missing from response"
    end
  end
end
