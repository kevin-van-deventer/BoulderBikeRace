require "test_helper"

class SubmissionsPerformanceTest < ActionDispatch::IntegrationTest
  setup do
    Submission.delete_all # Ensure a clean slate
  end

  test "handle 100 submissions without slowing down" do
    100.times do |i|
      Submission.create!(
        first_name: "Test",
        last_name: "User",
        email: "test#{i}@example.com",
        slogan: "Slogan number"
      )
    end

    get submissions_url
    assert_response :success
    json_response = JSON.parse(@response.body)

    assert_equal 100, json_response.length, "Should return exactly 100 submissions"
  end
end
