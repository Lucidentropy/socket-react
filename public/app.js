var App = React.createClass({
    getInitialState: function(){
        return {
            users : ['Nobody', 'Somebody', 'Bob']
        };
    },
    componentDidMount: function () {
        var self = this;
        
        this.socket = io.connect(window.location);
        this.socket.on('test', function() {
           self.socketytest();
        });


    },
    render: function(){
        return(
            <div id="reactChat">
                <UserList users={this.state.users}/>
            </div>
        );
    },
    socketytest : function(){
        console.warn('socketytest');
        this.setState({users: users.push('Test')});
    }
});


var UserList = React.createClass({
    render: function(){

        var userslist = [];
        $.each(this.props.users, function(k,username){
            userslist.push(<User username={username} />);
        })

        return(
            <div className="userlist">
                <h3>Users below</h3>
                {userslist}
                <DebugButton addDebugUser={this.addDebugUser} />
            </div>
        );
    },
    addUser : function(){
        console.warn('aaaaa');
    }
});

var User = React.createClass({
    render: function(){
        return(
            <div className="a-user">
                {this.props.username}
            </div>
        );
    }
});


var DebugButton = React.createClass({
    render: function(){
        return(
            <button onClick={this.addDebugUser}>Add Debug User</button>
        );
    },
    addDebugUser: function(){
        this.socket.emit('test');
    }
});


$(function(){
    React.render(<App />, $('#react')[0]);
});
















function update_log(v) {
    var chat = $('div.log');

    switch (v.type) {
        case 'user':
            chat.append($('<p/>').hide().html('<span class="u">' + v.username + '</span> : ' + v.text).fadeIn('fast'));
            break;
        case 'name change':
            chat.append($('<p/>').html('<span class="system">' + v.original + ' changed name to ' + v.newname + '.'));
            break;
        case 'disconnect':
            if (v.username !== '') chat.append($('<p/>').html('<span class="system">' + v.username + ' disconnected.'));
            break;
        case 'connect':
            chat.append($('<p/>').html('<span class="system">' + v.username + ' connected.'));
            
            break;
        default:
            console.error('Update log received invalid type', v);
    }
}

var socket = io.connect(window.location);
var currentUsers;
var chatLimit = 100;

socket.on('log', function(log) {
    if ($('div.log p').length > chatLimit) {
        var clip = $('div.log p').slice(-chatLimit);
        $('div.log').empty().html(clip);

    }

    if ($.isArray(log)) {
        $('div.log').empty();
        $.each(log, function(k, v) {
            update_log(v);
        });
    } else {
        update_log(log);
    }

    $('div.log').scrollTop($('div.log')[0].scrollHeight);
});

socket.on('user list', function(list) {
    $('div.users').empty();
    $.each(list, function(k, v) {
        $('div.users').append($('<p/>').html(v));
    });
    currentUsers = list;
});


$(function() {

    $('input.username').change(function() {
        var user = $(this).val();
        if ($.trim(user) === '') return false;

        if (currentUsers.indexOf(user) > -1) {
            alert('Username already in use.');
            return false;
        }
        socket.emit('username change', user);
    });

    $('form.chatform').submit(function() {
        var i = $('input.loginput');
        var u = $('input.username');
        var v = i.val();

        if ($.trim(v) === '' || $.trim(u.val()) === '') return false;
        socket.emit('updatelog', v);
        i.val('');
        $('div.log').scrollTop($('div.log')[0].scrollHeight);

        return false;
    });
});
