class CounterpartsController < ApplicationController
  before_action :authenticate_user!
  before_action :search_counterparts, only: [:index]
  respond_to :json, :html

  def index
    respond_to do |format|
      format.html do
        render component: "CounterpartsIndex", props:
          { initialCounterparts: prepare_array(@counterparts),
            meta: pagination_dict(@counterparts)}
      end
      format.json do
        if params[:page].present?
          render json: @counterparts, meta: pagination_dict(@counterparts)
        else
          # For dropdown.
          respond_with Counterpart.all.sorted
        end
      end
    end
  end

  def show
    respond_to do |format|
      format.html do
        render component: "CounterpartShow"
      end
    end
  end

  def create
    @counterpart = Counterpart.new(counterpart_params)
    if @counterpart.save
      if counterpart_params[:lawsuit_id]
        add_counterpart_to_lawsuit
      else
        flash[:success] = "Klient sparad!"
      end
    end
    respond_with @counterpart
  end

  def update
    @counterpart = Counterpart.find(params[:id])
    if counterpart_params[:lawsuit_id]
      add_counterpart_to_lawsuit
      @counterpart.save
    else
      @counterpart.update_attributes(counterpart_params)
    end
    respond_with @counterpart
  end

  def lawsuit_counterpart_list
    lawsuit = Lawsuit.find(params[:id])
    respond_with lawsuit.counterparts
  end

  private

  def counterpart_params
    params.require(:counterpart).permit(
      :name,
      :personal_number,
      :representative,
      :info,
      :lawsuit_id)
  end

  def search_counterparts
    @counterparts =
      if params[:search].present?
        Counterpart.search(params[:search])
      else
        Counterpart.all
      end.sorted.page(params[:page]).per_page(20)
  end

  def add_counterpart_to_lawsuit
    lawsuit = Lawsuit.find(counterpart_params[:lawsuit_id])
    @counterpart.lawsuits << lawsuit
    # Add the counterpart to all clients involved in lawsuit.
    lawsuit.clients.each do |client|
      @counterpart.clients << client
    end
  end
end
