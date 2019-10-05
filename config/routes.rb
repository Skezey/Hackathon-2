Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  namespace :api do
    resources :departments do
      resources :products
    end
    resources :products do
      resources :reviews
    end
  end
end
