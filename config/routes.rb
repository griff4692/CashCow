Rails.application.routes.draw do
  root to: 'site#root'

  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do
    resources :projects, except: [:new, :edit]
    resources :backings, only: [:create, :update, :destroy]
    resources :follows, only: [:create, :destroy]
  end

  get "/auth/:provider/callback", to: "sessions#omniauth"

end
