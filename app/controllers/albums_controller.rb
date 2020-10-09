class AlbumsController < ApplicationController
  before_action :set_user

  # Show all albums
  def index
    if current_user == nil
      redirect_to root_path
    else
      @credentials = current_user.credentials
      respond_to do |format|
        format.html
        format.json { render json: @user.albums }
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

  # Future search function
  # def search
  # end

  # Show album details
  def show
    @album = Album.find(params[:id])
    render json: @album
  end

  private

  # Sets current user
  def set_user
    @user = current_user
  end

  # Acceptable album params
  def album_params
    params.require(:album).permit(:name, :artist, :release_date, :external_url, :image_url)
  end

end