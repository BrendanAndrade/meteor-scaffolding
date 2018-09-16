import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Session } from 'meteor/session';
import { Accounts } from 'meteor/accounts-base';


// Import to load these templates
import '../../ui/layouts/app-body.js';
import '../../ui/pages/root-redirector.js';
import '../../ui/pages/app-not-found.js';
import '../../ui/pages/login.js';

exposed = FlowRouter.group({});




loggedIn = FlowRouter.group({
  triggersEnter: [
  function(){
    if (!(Meteor.userId() || Meteor.loggingIn())) {
      route = FlowRouter.current();

      if (route.route.name != 'login'){
        Session.set('redirectAfterLogin', route.path);
      }

      FlowRouter.go('signin');
    }
  }]
});

loggedIn.route('/', {
  name: 'App.home',
  action: function(params) {
    BlazeLayout.render('App_body', {main: 'home'});
  },
});



// the App_notFound template is used for unknown routes and missing lists
FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};


AccountsTemplates.configureRoute('signIn',{
  name: 'signin',
  path: '/signin',
  template: 'login',
  redirect: '/'
});

AccountsTemplates.configureRoute('signUp',{
  name: 'signup',
  path: '/signup',
  template: 'login',
  redirect: '/'
})

AccountsTemplates.configureRoute('forgotPwd', {
  template:'login'
});


AccountsTemplates.configureRoute('resetPwd', {
  template:'login'
});

AccountsTemplates.configureRoute('verifyEmail',{
  template:'login'
});

AccountsTemplates.configureRoute('resendVerificationEmail',{
  template:'login'
});

Accounts.onLogout(function(){
  FlowRouter.redirect('signin')
});