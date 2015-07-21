CashCow.Views.SignUp = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.$formErrors = options.$formErrors;
    this.model = options.model;
    this.collection = options.collection;
    this.$el.addClass('form');
  },

  template: JST['users/form'],

  events: {
    "submit form": "signUp"
  },

  render: function () {
    var content = this.template({
      user: this.model,
      type: 'signUp'
    });

    this.$el.html(content);
    return this;
  },

  signUp: function (event) {
    event.preventDefault();

    var fname = this.$("#fname").val();
    var lname = this.$("#fname").val();
    var email = this.$("#email").val();
    var password = this.$("#password").val();
    var image = this.$("#user-profile-pic")[0].files[0];

    var formData = new FormData();
    formData.append("user[fname]", fname);
    formData.append("user[lname]", lname);
    formData.append("user[email]", email);
    formData.append("user[password]", password);
    formData.append("user[image]", image);

    var that = this;

    this.model.saveFormData(formData, {
      success: function() {
        CashCow.currentUser.fetch();
        that.collection.add(that.model);
        Backbone.history.navigate('', { trigger: true } );
      },
      error: function (model, error, options) {
        that.renderFormErrors([error.responseText]);
      }
    });
  },

  fileInputChange: function(event){
    var that = this;
    var file = event.currentTarget.files[0];
    var reader = new FileReader();

    reader.onloadend = function(){
      that._updatePreview(reader.result);
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      that._updatePreview("");
    }
  },

  _updatePreview: function(src){
    this.$el.find("#preview-post-image").attr("src", src);
  },

  renderFormErrors: function (errors) {
    var $errorsList = $('<ul>');
    $errorsList.addClass('proj-errors');
    errors.forEach(function (error) {
      var $newLi = $('<li>');
      if(error.length > 20) {
        $newLi.text(error.slice(0,20) + "...");
      } else {
        $newLi.text(error)
      }
      $errorsList.append($newLi);
    });

    this.$formErrors.html($errorsList);
  }
});
