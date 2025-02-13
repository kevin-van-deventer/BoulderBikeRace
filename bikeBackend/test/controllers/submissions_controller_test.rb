require 'test_helper'

class SubmissionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @submission = Submission.create!( # new test submission in database
      first_name: "John",
      last_name: "Doe",
      email: "john@example.com",
      slogan: "This is a test slogan"
    )
  end

  test "should get index" do # retrieves all submissions
    get submissions_url # get req to api
    assert_response :success # check if response is successful
    json_response = JSON.parse(@response.body) # parse response body
    assert json_response.is_a?(Array), "Response should be an array"
    assert_not_empty json_response, "Response should contain submissions" # atleast one submission exists
  end

  test "should show submission" do # retrieves a single submission
    get submission_url(@submission) # GET request to /submissions/:id
    assert_response :success
    json_response = JSON.parse(@response.body) #checks return submission matches test submission
    assert_equal @submission.id, json_response["id"], "Submission ID should match"
    assert_equal @submission.first_name, json_response["first_name"], "First name should match"
    assert_equal @submission.last_name, json_response["last_name"], "Last name should match"
    assert_equal @submission.email, json_response["email"], "Email should match"
    assert_equal @submission.slogan, json_response["slogan"], "Slogan should match"
  end

  test "should create submission" do
    assert_difference('Submission.count', 1) do # checks new submission was added
      post submissions_url, params: { submission: {
        first_name: "Jane",
        last_name: "Smith",
        email: "jane@example.com",
        slogan: "A new slogan for testing"
      }}
    end
    assert_response :created
  end

  test "should not create submission with invalid email" do
    assert_no_difference('Submission.count') do # ensures the submission is not saved
      post submissions_url, params: { submission: {
        first_name: "Invalid",
        last_name: "User",
        email: "invalid_email",
        slogan: "Invalid email test"
      }}
    end
    assert_response :unprocessable_entity #422 error response
  end

  test "should not create submission with missing fields" do
    assert_no_difference('Submission.count') do
      post submissions_url, params: { submission: { first_name: "", last_name: "", email: "", slogan: "" }}
    end
    assert_response :unprocessable_entity
  end

  test "should not create submission with too long slogan" do
    assert_no_difference('Submission.count') do
      post submissions_url, params: { submission: {
        first_name: "Long",
        last_name: "Slogan",
        email: "long@example.com",
        slogan: "a" * 51
      }}
    end
    assert_response :unprocessable_entity
  end

  test "should return 404 if submission not found" do
    get submission_url(-1) # Non-existing ID
    assert_response :not_found
    json_response = JSON.parse(@response.body)
    assert_equal "Couldn't find Submission", json_response["error"], "Error message should be correct"
  end
end