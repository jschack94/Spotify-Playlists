class AlbumsController < ApplicationController
  
  #Append callback before any controller function runs
  
  before_action :set_user

  # Show all albums
  def index
    if current_user == nil
      redirect_to root_path
    else
      respond_to do |format|
        format.html
        format.json { render json: @user.albums }
        #If the request wants an HTML page, format.html.
        #If the request wants application/json, format.json.
      end
    end
  end

  # Create new album
  def create
    @album = @user.albums.build(album_params)
    if @album.save
      render json: @album
    end
  end

  # Show album details
  def show
    @album = Album.find(params[:id])
    
    render json: @album
  end

  private

  # Sets current user
  #private method for callback
  def set_user
    @user = current_user
  end

  # Acceptable album params
  #whitelist
  def album_params
    params.require(:album).permit(:name, :artist, :release_date, :external_url, :image_url)
  end

end