class CreateRiders < ActiveRecord::Migration[8.0]
  def change
    create_table :riders do |t|
      t.string :first_name
      t.string :last_name
      t.string :city
      t.float :latitude, precision: 10, scale: 6
      t.float :longitude, precision: 10, scale: 6

      t.timestamps
    end
  end
end
