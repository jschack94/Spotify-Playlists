class AlbumSerializer < ActiveModel::Serializer
    attributes :id, :name, :artist, :release_date, :external_url, :image_url, :user_id
  end