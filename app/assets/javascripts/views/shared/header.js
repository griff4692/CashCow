CashCow.Views.Header = Backbone.View.extend({
    initialize: function(options){
      this.listenTo(
        CashCow.currentUser,
        "signIn signOut",
        this.render);

      this.searchBarView = new CashCow.Views.Search();

      this.render();
    },

    events: {
      "click a#sign-out": "signOut",
      "click #sign-in": "signInModal",
    },

    signInModal: function (event) {
      event.preventDefault();

      var modalView = new CashCow.Views.SignInModal({});

      $('#content').append(modalView.render().$el);
    },

    tagName: 'header',

    template: JST['shared/header'],

    render: function(){
      var content = this.template({
          currentUser: CashCow.currentUser
    });

      this.$el.html(content);
      this.$el.addClass('nav');
      this.$('#search-bar').html(this.searchBarView.render().$el)
      return this;
    },

    signOut: function(event){
      event.preventDefault();
      CashCow.currentUser.signOut({
        success: function(){
          Backbone.history.navigate("", { trigger: true });
        }
      });
    }

  });
