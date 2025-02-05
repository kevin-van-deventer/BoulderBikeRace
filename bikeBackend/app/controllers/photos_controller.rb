class PhotosController < ApplicationController
  def index
      page = params[:page] || 1 # get page number
      flickr_service = FlickrService.new # new flickr instance
      response = flickr_service.fetch_photos(page) # api req to flickr with page number

      if response.blank? || response['photos'].blank? || response['photos']['photo'].blank?
        render json: { error: "Invalid response from Flickr" }, status: :bad_gateway
        return
      end

      photos = response['photos']['photo'].map do |photo|
        image_url = "https://live.staticflickr.com/#{photo['server']}/#{photo['id']}_#{photo['secret']}_w.jpg" #Constructs an image_url using Flickr's standard format

        # check for broken urls
        if image_broken?(image_url)
          nil
        else
          {
            id: photo['id'],
            title: photo['title'],
            image_url: image_url
          }
        end
      end.compact # Remove error images or nil value images
    render json: photos # returns list as json response
  end

  private

  # Check (404 or other errors)
  def image_broken?(url)
    uri = URI.parse(url)
    response = Net::HTTP.get_response(uri)

    return true if response.code.to_i >= 400 # check all errors >= than 400
    # true for broken images false for working images
    false
  rescue StandardError
    true # handle all errors as broken
  end
end