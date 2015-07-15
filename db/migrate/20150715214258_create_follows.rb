class CreateFollows < ActiveRecord::Migration
  def change
    create_table :follows do |t|
      t.integer :user_id, null: false
      t.integer :project_id, null: false
    end

    add_index :follows, :user_id
    add_index :follows, :project_id
    add_index :follows, [:user_id, :project_id], unique: true
  end
end
