class StaticPagesController < ApplicationController

    # Verify user before showing single page of web app
    def home
      @user = User.new
    end
  
    private
  
    # Find and set current user
    def current_user
      if session[:user_id]
        @user = User.find(session[:user_id])
      end
    end
  
  end