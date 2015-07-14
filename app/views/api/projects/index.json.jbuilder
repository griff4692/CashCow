json.array! @projects do |project|
	json.partial! 'show', project: project
end
