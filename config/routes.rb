Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'static_pages#home'

  resources :users, :only => [:create, :show] do
    resources :albums, :only => [:index, :create, :show, :update, :destroy]
  end