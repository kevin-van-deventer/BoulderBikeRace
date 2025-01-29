# app/services/flickr_service.rb
class FlickrService
    include HTTParty
    base_uri 'https://api.flickr.com/services/rest'
  
    def initialize
      @api_key = '43343253c11c98df00082540cb79b4fc' # Replace with your actual API key
    end
  
    # Method to fetch public photos
    def fetch_photos(page = 1)
      options = {
        query: {
          method: 'flickr.photos.search',
          api_key: @api_key,
          format: 'json',
          nojsoncallback: 1,
          per_page: 40,  # Number of photos per page
          page: page,       # Page number to fetch
          tags: 'BoulderBikeTour,bikerace', # Tags to filter images by (you can change this)
        }
      }
  
      self.class.get('', options)
    end
  end
  