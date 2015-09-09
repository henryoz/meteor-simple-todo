Meteor.subscribe("tasks");

Template.body.helpers({

  tasks: function() {
    if (Session.get("hideCompleted")) {
      return Tasks.find({
        checked: {$ne: true}}, {sort: {createdAt: -1}
      });
    }
    else {
      return Tasks.find({}, {sort: {createdAt: -1}});
    }
  },

  hideCompleted: function() {
    return Session.get("hideCompleted");
  },

  incompleteCount: function() {
    return Tasks.find({
      checked: { $ne: true }})
    .count();
  }
});

Template.body.events({

  "submit .new-task": function (e) {
    e.preventDefault();

    var text = e.target.text.value;

    // insert a task into the collection
    Meteor.call("addTask", text);

    // clear the form
    e.target.text.value = "";
  },

  "change .hide-completed input": function(e) {
    Session.set("hideCompleted", e.target.checked);
  }
});