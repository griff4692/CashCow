fnames = ["Bertha", "Patty", "Seamus", "Angelika", "Nelson", "Pablo", "Quincy", "Carmelo", "Peter", "Pam" "Kristaps"]
lnames = ["Hewes", "Valentine", "Heaney", "Houston", "Jones", "Mandela", "Porzingis", "Anthony", "Pan", "DeLaPieu"]

projects = {
	"Art" => [
		["thistitle", "description"],
		["heytitle", "description"],
		["tityoule","description"],
		["tikn,tle","description"]
	],
	"Music" => [
		["titoile", "description"],
		["titmnle", "description"],
		["titwwxle","description"],
		["titmnle","description"]
	],
	"Philanthropy" => [
		["titile", "description"],
		["titklne", "description"],
		["tikljmtle","description"],
		["tijfwtle","description"]
	],
}

images = {
	"Art" => 'http://i.imgur.com/WrobxaJ.jpg',
	"Philanthropy" => 'http://livingcivil.com/wp-content/uploads/2011/10/Story4.jpg',
	"Music" => 'http://8020.photos.jpgmag.com/3510083_206038_a3b8fe42df_p.jpg'
}

5.times do |i|
	user = User.create!(
		fname: fnames.sample,
		lname: lnames.sample,
		email: Faker::Internet.email,
		image: Faker::Avatar.image,
		password: 'pablo40b')

	categories = ["Art", "Philanthropy", "Music"]
	randYear = (2016..2020).to_a
	randMonth = (1..12).to_a

	6.times do |j|
		category = categories.sample
		project = projects[category].sample

		Project.create!(
			user_id: user.id,
			title: "title" + i.to_s + j.to_s,
			description: project[1],
			category: category,
			goal: rand(2500000),
			deadline: Date.new(randYear.sample, randMonth.sample, 1),
			image: images[category]
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
