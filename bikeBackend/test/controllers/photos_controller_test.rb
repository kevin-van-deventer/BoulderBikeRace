require 'test_helper'
require 'mocha/minitest' # mocking API calls
require 'net/http'

# Mocking using stubs
# object → The object whose method you want to stub.
# stubs(:method_name) → Replaces the actual method with a stub.
# returns(value) → Specifies the value that should be returned when the stubbed method is called.

class PhotosControllerTest < ActionDispatch::IntegrationTest
  setup do
    @flickr_service_mock = mock() # mock object instead of call real api
    FlickrService.stubs(:new).returns(@flickr_service_mock)
    # → When FlickrService.new is called, it returns the mock
    # object @flickr_service_mock instead of calling the real service.
  end

  test "should fetch photos from Flickr API successfully" do
    sample_response = {
      'photos' => {
        'photo' => [
          { 'id' => '1', 'title' => 'Test Photo', 'server' => '123', 'secret' => 'abc' }
        ]
      }
    }
    @flickr_service_mock.stubs(:fetch_photos).returns(sample_response)
    PhotosController.any_instance.stubs(:image_broken?).returns(false)

    get photos_url
    assert_response :success
    json_response = JSON.parse(@response.body)
    assert_not_empty json_response, "Response should not be empty"
    assert_equal "1", json_response.first["id"], "Photo ID should match"
  end

  test "should return error if Flickr API response is invalid" do
    @flickr_service_mock.stubs(:fetch_photos).returns(nil)

    get photos_url
    assert_response :bad_gateway
    json_response = JSON.parse(@response.body)
    assert_equal "Invalid response from Flickr", json_response["error"], "Should return API error message"
  end

  test "should filter out broken images from Flickr API response" do
    sample_response = {
      'photos' => {
        'photo' => [
          { 'id' => '1', 'title' => 'Valid Photo', 'server' => '123', 'secret' => 'abc' }, # valid
          { 'id' => '2', 'title' => 'Broken Photo', 'server' => '456', 'secret' => 'def' } # broken
        ]
      }
    }
    @flickr_service_mock.stubs(:fetch_photos).returns(sample_response)
    PhotosController.any_instance.stubs(:image_broken?).with(regexp_matches(/1_/)).returns(false) # returns false and image is valid 1_
    PhotosController.any_instance.stubs(:image_broken?).with(regexp_matches(/2_/)).returns(true) # returns true and image is broken 2_

    get photos_url
    assert_response :success
    json_response = JSON.parse(@response.body)
    assert_equal 1, json_response.size, "Only valid photos should be included"
    assert_equal "1", json_response.first["id"], "Valid photo should be included"
    assert json_response.none? { |photo| photo["id"] == "2" }, "Broken photo with ID '2' should be removed"
  end

end