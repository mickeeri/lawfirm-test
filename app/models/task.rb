class Task < ActiveRecord::Base
  belongs_to :legal_case
  belongs_to :price_category, required: true # TODO: change to has_one?
  validates :entry, presence: true, length: { maximum: 1000  }
  validates :worked_hours, presence: true

  scope :sorted_by_date, -> { order(date: :asc) } # TODO: make into datetime
end
