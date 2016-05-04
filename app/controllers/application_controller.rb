class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :exception
  protect_from_forgery with: :null_session
  # include ActionController::Serialization
  # before_filter :deep_snake_case_params!


  private

  # To render pagination info as json.
  def pagination_dict(object)
    {
      currentPage: object.current_page,
      nextPage: object.next_page,
      previousPage: object.previous_page,
      totalPages: object.total_pages,
      totalEntries: object.total_entries
    }
  end

  # To serialize data to React components if not json.
  def prepare_array(array)
    ActiveModel::ArraySerializer.new(array, each_serializer: serializer(array))
  end

  def prepare(resource, pref_serializer=nil, options={})
    if pref_serializer
      pref_serializer.new(resource, options)
    else
      serializer(resource).new(resource, options)
    end
  end

  def serializer(resource)
    if resource.respond_to? :name
      "#{resource.name}Serializer".safe_constantize
    else
      "#{resource.class}Serializer".safe_constantize
    end
  end

  # Convert lowerCamelCase params to snake_case automatically
  # def deep_snake_case_params!(val = params)
  #   case val
  #   when Array
  #     val.map {|v| deep_snake_case_params! v }
  #   when Hash
  #     val.keys.each do |k, v = val[k]|
  #       val.delete k
  #       val[k.underscore] = deep_snake_case_params!(v)
  #     end
  #     val
  #   else
  #     val
  #   end
  # end

  # def default_serializer_options
  #   {root: false}
  # end
end
