CashCow.Collections.Users = Backbone.Collection.extend({
  url: "/api/users",
  model: CashCow.Models.User,


  page: function (num, offset) {
  	return this.models.slice((num - 1) * offset, ((num - 1) * offset + offset));
  },

  totalPages: function(offset) {
  	var length = this.models.length;
  	var floor = Math.floor(length / offset);

  	if (length % offset === 0) {
  		return floor;
  	} else {
  		return floor + 1;
  	}
  },

  getOrFetch: function(id) {
    var user = this.get(id),
        users = this;

    if(!user) {
      user = new this.model({ id: id });
      user.fetch({
        success: function() {
          users.add(user);
        }
      });
    } else {
      user.fetch();
    }

    return user;
  }
});

CashCow.Collections.Backers = CashCow.Collections.Users.extend({
  url: 'na',
  model: CashCow.Models.Backer,

  comparator: 'amount'
});
