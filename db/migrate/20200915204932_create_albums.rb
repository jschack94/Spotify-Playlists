class CreateAlbums < ActiveRecord::Migration[6.0]
  def change
    create_table :albums do |t|
      t.integer :rank
      t.string :name
      t.integer :user_id
      t.string :artist
      t.datetime :release_date
      t.string :external_url
      t.string :image_url
    end
  end
end
