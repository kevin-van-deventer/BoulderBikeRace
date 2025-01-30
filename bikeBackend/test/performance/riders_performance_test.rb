# test/performance/riders_performance_test.rb
require "test_helper"

class RidersPerformanceTest < ActionDispatch::IntegrationTest
  setup do
    Rider.delete_all # Ensure a clean test database
  end

  test "handle 100 rider signups without slowing down" do
    100.times do |i|
      post riders_url, params: { rider: {
        first_name: "Rider#{i}",
        last_name: "User",
        city: "City#{i}",
        latitude: 40.7128 + i * 0.001,
        longitude: -74.0060 + i * 0.001
      }}
      assert_response :created
    end

    get riders_url
    assert_response :success
    json_response = JSON.parse(@response.body)
    assert_equal 100, json_response.length, "Should return exactly 100 riders"
  end
end