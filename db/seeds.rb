3.times do |i|
	user = User.create(email: "griff4692" + i.to_s, password: 'pablo40b')

	title = "title" + i.to_s

	3.times do |j|
		Project.create(user_id: user.id, title: title+j.to_s,
			description: 'project',
			goal: 100+j,
			deadline: Date.new(2015, 10, 1),
			image_url: 'random_image_avatar.com'
		)
	end
end
