json.results do
  json.array! @search_results do |search_result|
    json.partial! "api/projects/show", project: search_result.searchable
  end
end
