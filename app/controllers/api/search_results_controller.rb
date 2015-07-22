class Api::SearchResultsController < ApplicationController
  def search
    @search_results = Project
      .search_by_title(params[:query])
      .includes(:searchable)
      
    render :search
  end

end
