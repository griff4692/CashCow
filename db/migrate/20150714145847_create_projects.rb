class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.integer :user_id, null: false
      t.string :category, null: false
      t.string :title, null: false
      t.text :description, null: false
      t.integer :goal, null: false
      t.date :deadline, null: false
      t.string :image_url, null: false

      t.timestamps
    end

    add_index :projects, :user_id
    add_index :projects, :title, unique: true
  end
end
