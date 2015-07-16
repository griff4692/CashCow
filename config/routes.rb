Rails.application.routes.draw do
  root to: 'site#root'

  namespace :api, defaults: { format: :json } do
    resources :projects, except: [:new, :edit]
    resources :backings, only: [:create, :update, :destroy]
    resources :follows, only: [:create, :destroy]
    resources :users, only: [:create, :update, :show, :index, :destroy]
    resource :session, only: [:create, :update, :show, :destroy]
  end

  get "/auth/:provider/callback", to: "api/sessions#omniauth"

end
