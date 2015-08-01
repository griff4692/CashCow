fnames = ["Bertha", "Patty", "Seamus", "Angelika", "Nelson", "Pablo", "Quincy", "Carmelo", "Peter", "Pam", "Kristaps"]
lnames = ["Hewes", "Valentine", "Heaney", "Houston", "Jones", "Mandela", "Porzingis", "Anthony", "Pan", "DeLaPieu"]

images = {
	"Art" => 'http://i.imgur.com/WrobxaJ.jpg',
	"Music" => 'http://8020.photos.jpgmag.com/3510083_206038_a3b8fe42df_p.jpg',
	"Philanthropy" => 'http://livingcivil.com/wp-content/uploads/2011/10/Story4.jpg'
}

projects = [
	["Art", "Punctuated: The Art of !.?,-", "English major turned artist Dot Dash will use contributions to curate and install an exhibition of art that features themes of pause, stop, RESTfulness."],
	["Art", "FiredUp Glassworks", "I am a glassblower recently graduated from RISD looking to establish my own studio.  I am looking for funds to buy a furnace, annealer, and bench."],
	["Art", "A Coder's Coloring Book","From the creative minds at App Academy comes a new way of thinking...and coloring!  An immersive coloring book experience - a journey through JavaScript, Backbone, and Rails."],
	["Art", "Bowery Diner Sign Restoration","The iconic Bowery diner sign circa 1956 is deteroriating.  Paint and new neon tubing will restore this beloved local landmark."],
	["Art", "Plastic Bag Pyramid", "A collaboration between Parsons graduate students and Al Gore that seeks funding to purchase framing materials to construct a 10-story pyramid using discarded plastic bags."],
	["Music", "The Gentrified Gents", "This dapper R&B duo needs your donations to stage a free concert in Prospect Park.  Help the Brooklyn born brothers share their suave vocal styling and smooth moves with their hometown local fans."],
	["Music", "Middle School Mixtape", "6th Graders at PS149 need help to fund the production of an original EP."],
	["Music", "Read Between the Lines", "This is 'The Librarians' debut album.  These WABA Radio Battle of the Bands winners need your help to promote it and get it out to the world."],
	["Music", "Tour Bus Tuneup","We are a Traveling Bluegrass Band that needs to take our show on the road.  But our bus is broke and so are we!"],
	["Music", "Kings Of Leon Rap", "This old school rockband is looking to branch out into rap.  Our production label dropped us so now we need the public's help and ... belief."],
	["Philanthropy", "The Seasonal Schoolhouse", "Help fund this healthy eating initiative started by a New York State farmer's collective that gathers, transports, and distributes fresh produce straight from the field to New York public school cafeterias."],
	["Philanthropy", "Never Say Never", "A free web design course taught in CSS and JavaScript for senior citizens of Arkansas.  Our crew need help to prepare the materials for the first two lectures: 'Turning it On' and 'What Does that Button do?''."],
	["Philanthropy", "Gone Fishing","Save the Sagaponack Sunfish!  All donations will go to organize a rally at the Long Island Department of Fisheries!"],
	["Philanthropy", "Build it Back Program","Our team of trained counselors, educators and psychologists will help work with juvenile offenders to help build job skills and stay in school."],
	["Philanthropy", "Save the Chilean Peppercorn", "The Chilean Peppercorn both black and white is an endangered species of pepper.  Help us save this delectable spice."]
]

projects.each do |project|
	fname = fnames.sample
	lname = lnames.sample
	email = Faker::Internet.email
	profile = Faker::Avatar.image
	password = 'password'

	user = User.create!(
		fname: fname,
		lname: lname,
		email: email,
		image: profile,
		password: 'password')

	randYear = (2016..2020).to_a
	randMonth = (1..12).to_a
	category = project[0]
	image = images[category]
	title = project[1]
	description = project[2]

	Project.create!(
		user_id: user.id,
		title: title,
		description: description,
		category: category,
		goal: rand(2500000),
		deadline: Date.new(randYear.sample, randMonth.sample, 1),
		image: images[category]
	)
end

user_ids = User.pluck(:id)
project_ids = Project.pluck(:id)
used_pairings = []

75.times do |i|
	user_id = user_ids.sample
	project_id = project_ids.sample
	next if used_pairings.include?([user_id, project_id])
	used_pairings << [user_id, project_id]
	Follow.create!(user_id: user_id, project_id: project_id)
	Backing.create!(user_id: user_id, project_id: project_id, amount: rand(10000))
end
