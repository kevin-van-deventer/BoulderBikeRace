Rails.application.routes.draw do
  resources :riders
  resources :submissions
  # flickr
  resources :photos, only: [:index]

  namespace :api do
    # namespace :v1 do
      resources :riders, only: [:index, :show, :create, :update, :destroy]
      resources :submissions, only: [:index, :show, :create]
    # end
  end
end
