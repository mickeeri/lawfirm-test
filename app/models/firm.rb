class Firm < ActiveRecord::Base
  has_many :users, dependent: :destroy
  validates :name, presence: true, length: { maximum: 40 }
end