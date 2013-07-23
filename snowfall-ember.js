window.Snowfall = Ember.Application.create();

// routes and stuff

Snowfall.Router.map(function () {
  this.resource('snowfall', { path: '/' });
});

Snowfall.ThreadsRoute = Ember.Route.extend({
  model: function () {
    return Snowfall.Thread.find();
  }
});

// objects

Snowfall.Tag = Ember.Object.extend({
    name: '',
    count: function(self){ return self.threads.length; },
    threads: []
});

Snowfall.Thread = Ember.Object.extend({
    unread: true,
    starred: false,
    authors: [],
    tags: [],
    subject: '',
    attachment: false
});

Snowfall.Threads = [
    Snowfall.Thread.create({
        id: 1,
        unread: false,
        authors: ['Kim Sawyer'],
        tags: ['Work'],
        subject: 'Meeting on Wednesday: so many donuts!!!'
        }),
    Snowfall.Thread.create({
        id: 2,
        authors: ['Brendan', 'Marshall', 'Kai'],
        subject: '[pymsp] Looking for a Python tutor'
        }),
    Snowfall.Thread.create({
        id: 3,
        unread: false,
        starred: true,
        authors: ['Ginger Lee'],
        tags: ['Social', 'Friends'],
        subject: 'Rhubarb party!',
        attachment: true
        })
];