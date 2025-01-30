require 'test_helper'

class SubmissionTest < ActiveSupport::TestCase
  def setup
    @submission = Submission.new(first_name: "James", last_name: "Bond", email: "jamesb@gmail.com",slogan: "Bike Tour Entry")
  end

  test "should be valid" do
    assert @submission.valid?
  end

  test "first_name should be present" do
    @submission.first_name = " "
    assert_not @submission.valid?
  end

  test "last_name should be present" do
    @submission.last_name = " "
    assert_not @submission.valid?
  end

  test "email should be present" do
    @submission.email = " "
    assert_not @submission.valid?
  end

  test "email should be valid format" do
      invalid_emails = ["invalidemail", "user@com", "user@.com", "user@example,com"]
      invalid_emails.each do |invalid|
      @submission.email = invalid
      assert_not @submission.valid?, "#{invalid.inspect} should be invalid"
    end
  end

  test "slogan should be present" do
    @submission.slogan = " "
    assert_not @submission.valid?
  end
end
