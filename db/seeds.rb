fnames = ["Bertha", "Patty", "Griffin", "Pablo", "Quincy", "Kristaps"]
lnames = ["Hewes", "Valentine", "Amus", "Adams", "Jones", "Porzingis"]

15.times do |i|
	user = User.create!(
		fname: fnames.sample,
		lname: lnames.sample,
		email: "griff04692" + i.to_s,
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
			description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
			category: category,
			goal: rand(2500000),
			deadline: Date.new(randYear.sample, randMonth.sample, 1),
			image: 'http://41.media.tumblr.com/b6e166c8b2adc00adbdcf3290ddb7658/tumblr_mlpmilKm5p1qkodk4o1_1280.jpg'
		)
	end
end

user_ids = User.pluck(:id)
project_ids = Project.pluck(:id)
used_pairings = []

50.times do |i|
	user_id = user_ids.sample
	project_id = project_ids.sample
	next if used_pairings.include?([user_id, project_id])
	used_pairings << [user_id, project_id]
	Follow.create!(user_id: user_ids.sample, project_id: project_ids.sample)
	Backing.create!(user_id: user_ids.sample, project_id: project_ids.sample, amount: rand(1000))
end
