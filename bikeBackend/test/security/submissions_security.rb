require "test_helper"

class SubmissionsSecurityTest < ActionDispatch::IntegrationTest
  setup do
    @valid_submission = submissions(:valid_submission)
    @invalid_submission = submissions(:invalid_submission)
    @sql_injection_submission = submissions(:sql_injection_submission)
    @xss_submission = submissions(:xss_submission)
  end

  test "should prevent SQL injection in submission creation" do
    Submission.delete_all # Ensure a clean test database

    assert_difference "Submission.count", 0 do
      post submissions_url, params: { submission: @sql_injection_submission.attributes }
    end
    
    assert_response :unprocessable_entity
  end

  test "should prevent XSS attacks in submission input" do
    post submissions_url, params: { submission: @xss_submission.attributes }
  
    assert_response :unprocessable_entity # Expect validation to reject script tags
    json_response = JSON.parse(@response.body)
    assert_includes json_response["errors"], "First name only allows letters and spaces", "XSS should be blocked by input validation"
  end

  test "should prevent invalid data from being saved" do
    post submissions_url, params: { submission: @invalid_submission.attributes }
    
    assert_response :unprocessable_entity
    json_response = JSON.parse(@response.body)
    
    assert json_response["errors"].is_a?(Array), "Errors should be an array"
    assert_includes json_response["errors"], "First name can't be blank", "Should validate presence of first name"
    assert_includes json_response["errors"], "Last name can't be blank", "Should validate presence of last name"
    assert_includes json_response["errors"], "Email must be a valid email address", "Should validate email format"
    assert_includes json_response["errors"], "Slogan can't be blank", "Should validate presence of slogan"
  end
end