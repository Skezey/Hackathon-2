class CreateReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :reviews do |t|
      t.belongs_to :product, foreign_key: true
      t.string :subject
      t.text :body
      t.integer :stars
      t.datetime :date

      t.timestamps
    end
  end
end
