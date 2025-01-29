# app/controllers/photos_controller.rb
class PhotosController < ApplicationController
    def index
        page = params[:page] || 1 # fetch page number
        flickr_service = FlickrService.new
        response = flickr_service.fetch_photos(page)
  
      # Extract photo information from the response
      photos = response['photos']['photo'].map do |photo|
        {
          id: photo['id'],
          title: photo['title'],
          image_url: "https://live.staticflickr.com/#{photo['server']}/#{photo['id']}_#{photo['secret']}_w.jpg"
        }
      end
  
      render json: photos
    end
  end
  