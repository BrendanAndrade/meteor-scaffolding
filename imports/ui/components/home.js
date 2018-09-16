import './home.html';

Template.home.events({
  'click .logout': function(event){
    event.preventDefault();
    AccountsTemplates.logout();
  }
})