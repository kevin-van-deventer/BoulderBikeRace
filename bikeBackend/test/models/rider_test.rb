require 'test_helper'

class RiderTest < ActiveSupport::TestCase
  def setup
    @rider = Rider.new(first_name: "John", last_name: "Doe", city: "New York",latitude: 40.7128, longitude: 74.0060)
  end

  test "should be valid" do
    assert @rider.valid?
  end

  test "first_name should be present" do
    @rider.first_name = " "
    assert_not @rider.valid?
  end

  test "last_name should be present" do
    @rider.last_name = " "
    assert_not @rider.valid?
  end

  
  test "city should be present" do
    @rider.city = " "
    assert_not @rider.valid?
  end

  test "latitude should be present" do
    @rider.latitude = " "
    assert_not @rider.valid?
  end

end