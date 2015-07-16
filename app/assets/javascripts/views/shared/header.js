CashCow.Views.Header = Backbone.View.extend({
    initialize: function(options){
      this.listenTo(
        CashCow.currentUser,
        "signIn signOut",
        this.render);

      // this.logoPath = options.logoPath;
      this.render();
    },

    events: {
      "click #sign-out-link": "signOut"
    },

    tagName: 'nav',

    template: JST['shared/header'],

    render: function(){
      var content = this.template({
          currentUser: CashCow.currentUser
          // logoPath: this.logoPath
      });

      this.$el.html(content);
      this.$el.addClass('nav');
      this.$el.addClass('nav-bar');
      this.$el.addClass('group');
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
