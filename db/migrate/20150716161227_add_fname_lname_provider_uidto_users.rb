class AddFnameLnameProviderUidtoUsers < ActiveRecord::Migration
  def change
    add_column :users, :fname, :string
    add_column :users, :lname, :string
    add_column :users, :provider, :string
    add_column :users, :uid, :string
  end
end
