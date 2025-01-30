require "test_helper"

class SubmissionsSecurityTest < ActionDispatch::IntegrationTest
  setup do
    Submission.delete_all # Ensure a clean test database
  end

  test "should prevent SQL injection in submission creation" do
    post submissions_url, params: { submission: {
      first_name: "Robert'); DROP TABLE submissions;--",
      last_name: "Hacker",
      email: "hacker@example.com",
      slogan: "Hacked slogan"
    }}
    
    assert_response :unprocessable_entity
    assert Submission.count == 0, "Database should not be affected by SQL injection"
  end

  test "should prevent XSS attacks in submission input" do
    post submissions_url, params: { submission: {
      first_name: "<script>alert('XSS');</script>",
      last_name: "User",
      email: "xss@example.com",
      slogan: "<script>alert('XSS');</script>"
    }}
  
    assert_response :unprocessable_entity # Expect validation to reject script tags
    json_response = JSON.parse(@response.body)
    assert_includes json_response["errors"], "First name only allows letters and spaces", "XSS should be blocked by input validation"
  end

  test "should prevent invalid data from being saved" do
    post submissions_url, params: { submission: {
      first_name: "",
      last_name: "",
      email: "invalid-email",
      slogan: ""
    }}
    
    assert_response :unprocessable_entity
    json_response = JSON.parse(@response.body)
    
    assert json_response["errors"].is_a?(Array), "Errors should be an array"
    assert_includes json_response["errors"], "First name can't be blank", "Should validate presence of first name"
    assert_includes json_response["errors"], "Last name can't be blank", "Should validate presence of last name"
    assert_includes json_response["errors"], "Email must be a valid email address", "Should validate email format"
    assert_includes json_response["errors"], "Slogan can't be blank", "Should validate presence of slogan"
  end
end