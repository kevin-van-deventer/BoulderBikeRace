class FlickrService
    include HTTParty # , giving it methods like get to make HTTP requests
    base_uri 'https://api.flickr.com/services/rest'
  
    def initialize
      @api_key = '43343253c11c98df00082540cb79b4fc'
    end
  
    # fetch public photos
    def fetch_photos(page = 1)
      options = {
        query: {
          method: 'flickr.photos.search', # search for photos
          api_key: @api_key, # 
          format: 'json',
          nojsoncallback: 1,
          per_page: 40,  # Number of photos per page
          page: page,    # Page number to fetch
          tags: 'BoulderBikeTour,bikerace', # Tags to filter images
        }
      }
  
      self.class.get('', options) #Sends a GET request to the base URI with the provided options '' being no additional path
    end
  end
  