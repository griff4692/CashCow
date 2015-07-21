fnames = ["Bertha", "Patty", "Griffin", "Pablo", "Quincy", "Kristaps"]
lnames = ["Hewes", "Valentine", "Amus", "Adams", "Jones", "Porzingis"]

25.times do |i|
	user = User.create!(
		fname: fnames.sample,
		lname: lnames.sample,
		email: "griff4692" + i.to_s,
		password: 'pablo40b')

	title = "title" + i.to_s
	categories = ["Art", "Philanthropy", "Music"]
	randYear = (2016..2020).to_a
	randMonth = (1..12).to_a

	rand(10).times do |j|
		category = categories.sample

		Project.create!(
			user_id: user.id,
			title: title+j.to_s,
			description: 'project',
			category: category,
			goal: rand(25000),
			deadline: Date.new(randYear.sample, randMonth.sample, 1),
			image: 'http://41.media.tumblr.com/b6e166c8b2adc00adbdcf3290ddb7658/tumblr_mlpmilKm5p1qkodk4o1_1280.jpg'
		)
	end
end

user_ids = User.pluck(:id)
project_ids = Project.pluck(:id)

75.times do |i|
	Follow.create!(user_id: user_ids.sample, project_id: project_ids.sample)
	Backing.create!(user_id: rand(25), project_id: rand(249), amount: rand(250))
end
