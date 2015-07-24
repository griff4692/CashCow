fnames = ["Bertha", "Patty", "Seamus", "Angelika", "Nelson", "Pablo", "Quincy", "Carmelo", "Peter", "Pam" "Kristaps"]
lnames = ["Hewes", "Valentine", "Heaney", "Houston", "Jones", "Mandela", "Porzingis", "Anthony", "Pan", "DeLaPieu"]

25.times do |i|
	user = User.create!(
		fname: fnames.sample,
		lname: lnames.sample,
		email: Faker::Internet.email,
		image: Faker::Avatar.image,
		password: 'pablo40b')

	categories = ["Art", "Philanthropy", "Music"]
	randYear = (2016..2020).to_a
	randMonth = (1..12).to_a

	rand(5).times do |j|
		category = categories.sample

		Project.create!(
			user_id: user.id,
			title:  Faker::Team.name + i.to_s + j.to_s,
			description: Faker::Lorem.paragraph,
			category: category,
			goal: rand(2500000),
			deadline: Date.new(randYear.sample, randMonth.sample, 1),
			image: Faker::Avatar.image
		)
	end
end

user_ids = User.pluck(:id)
project_ids = Project.pluck(:id)
used_pairings = []

100.times do |i|
	user_id = user_ids.sample
	project_id = project_ids.sample
	next if used_pairings.include?([user_id, project_id])
	used_pairings << [user_id, project_id]
	Follow.create!(user_id: user_id, project_id: project_id)
	Backing.create!(user_id: user_id, project_id: project_id, amount: rand(10000))
end
