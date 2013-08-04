angular.module('SnowfallModule', []).filter('commafy', function() {
        return function(input) {
            if (input.length > 1){
                var firstNames = input.map(function(name){
                    firstName = name.split(' ')[0].split('.')[0];
                    return firstName;
                });
                return firstNames.join(', ');
            }
            else {
                return input[0];
            }
        };
});

function ThreadCtrl($scope) {
    $scope.threads = [
        {
            inInbox: true,
            isSpam: false,
            isTrash: false,
            isRead: false,
            isStarred: true,
            authors: ['Lily Simonsen'],
            tags: ['Work'],
            subject: 'Meeting on Wednesday: come eat donuts!!!',
            hasAttachment: ' '
        },
        {
            inInbox: true,
            isSpam: false,
            isTrash: false,
            isRead: false,
            isStarred: false,
            authors: ["Jesse Flores", "Marshall Washington", "Kai Summers"],
            tags: [],
            subject: '[pymsp] Looking for a Python tutor',
            hasAttachment: ' '
        },
        {
            inInbox: false,
            isSpam: false,
            isTrash: false,
            isRead: true,
            isStarred: false,
            authors: ["Wallace Borrin"],
            tags: ['Friends'],
            subject: 'bonjour',
            hasAttachment: ' '
        },
        {
            inInbox: true,
            isSpam: false,
            isTrash: false,
            isRead: true,
            isStarred: true,
            authors: ["Ginger Lee", "me"],
            tags: ['Social', 'Friends'],
            subject: 'Rhubarb party!',
            hasAttachment: '📎'
        }
    ];

    $scope.tags = [
        {
            name: 'Family',
            color: 'eddf99'
        },
        {
            name: 'Friends',
            color: '99ee88'
        },
        {
            name: 'Work',
            color: 'ff99cc'
        },
        {
            name: 'CCBDC',
            color: '88ffb0'
        },
        {
            name: 'Social',
            color: 'aaafef'
        }
    ];

    // sidebar methods

     $scope.unreadCount = function(tag) {
        var count = 0;
        angular.forEach($scope.threads, function(thread) {
            var threadCounts = true;
            if (tag) {
                threadCounts = thread.tags.indexOf(tag) > -1;
            }
            threadCounts = threadCounts && !thread.isRead;
            count += threadCounts ? 1 : 0;
        });
        return count;
    };

    $scope.allRead = function(tag) {
        return $scope.unreadCount(tag) === 0;
    };

    // actions bar methods

    $scope.toggleCheckAll = function() {
        var checkStatus = false;
        if ($('.check-all')[0].checked) {
            checkStatus = true;
        }
        $.each($scope.threads, function(index){
            var thread = $scope.threads[index];
            thread.isChecked = checkStatus;
        });
    };

    $scope.archive = function(){
        console.log('clicked');
        $.each($scope.threads, function(index){
            var thread = $scope.threads[index];
            if (thread.isChecked) {
                thread.inInbox = false;
            }
        });
    };

    $scope.trash = function(){
        $.each($scope.threads, function(index){
            var thread = $scope.threads[index];
            if (thread.isChecked) {
                thread.isTrash = true;
            }
        });
    };

    $scope.spam = function(){
        $.each($scope.threads, function(index){
            var thread = $scope.threads[index];
            if (thread.isChecked) {
                thread.isSpam = false;
            }
        });
    };

    // data cleanup stuff

    // fix relationships of objects
    $.each($scope.threads, function(index){
        var thread = $scope.threads[index];
        var new_tags_list = [];
        $.each(thread.tags, function(jindex){
            var tag_name = thread.tags[jindex];
            $.each($scope.tags, function(kindex){
                var tag = $scope.tags[kindex];
                if (tag.name === tag_name) {
                    new_tags_list.push(tag);
                }
            });
        });
        thread.tags = new_tags_list;
    });

    // make all threads unchecked to start
    $.each($scope.threads, function(index){
        var thread = $scope.threads[index];
        thread.isChecked = false;
    });
}