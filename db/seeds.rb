10.times do |i|
	user = User.create(email: "griff4692" + i.to_s, password: 'pablo40b')

	title = "title" + i.to_s
	categories = ["Art", "Philanthropy", "Music"]
	randYear = (2016..2020).to_a
	randMonth = (1..12).to_a

	5.times do |j|
		category = categories.sample

		Project.create(
			user_id: user.id,
			title: title+j.to_s + " regarding " + category,
			description: 'project',
			category: category,
			goal: rand(100),
			deadline: Date.new(randYear.sample, randMonth.sample, 1),
			image_url: 'random_image_avatar.com'
		)
	end
end
