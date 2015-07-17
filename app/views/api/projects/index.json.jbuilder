json.array! @projects do |project|
	json.partial! 'show', project: project, include_details: true
end
