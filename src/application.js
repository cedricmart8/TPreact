var React = require("react");
var ReactDOM = require("react-dom");
var UserForm = require("./components/UserForm");
var ConnectUser = require("./components/ConnectUser");
var GetMessageUser = require("./components/GetMessageUser");
var PostMessageUser = require("./components/PostMessageUser");
var DeleteMessageUser = require("./components/DeleteMessageUser");
var Button = require("react-mdl").Button;


class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idUser: sessionStorage.getItem('id'),
      token: sessionStorage.getItem('token')
    }
    this.toggleState = this.toggleState.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  logOut(event){
    sessionStorage.clear();
    console.log(sessionStorage);
  }

  toggleState(user) {
    console.log(user);
    sessionStorage.setItem('token', user.token);
    sessionStorage.setItem('idUser', user.user.id);
    this.setState({idUser: user.user.id})
    this.setState({token: user.token})

  }
  render() {
    if(!this.state.token){ //Vue si non Connecté
      console.log("token vide");
      return (
    	  <div id="Connect" style={{display:"flex",margin:"10px", alignItems:"center", flexDirection: "column"}}>
          <UserForm onUserCreated={this.toggleState}/>
          <br />
          <ConnectUser onUserLogged={this.toggleState}/>
        </div>)
    }
    else {
      return (
        <div style={{backgroundColor:"#EEEEEE"}}>
          <div style={{display:"flex"}}>
            <GetMessageUser idUser={this.state.idUser} token={this.state.token}/>
          </div>
          <br />
          <div  style={{display:"flex", justifyContent:"center"}}>
            <PostMessageUser token={this.state.token}/>
          </div>
          <form onSubmit={this.logOut} style={{padding:"10px", display:"flex", justifyContent:"center"}}>
            <Button raised ripple style={{backgroundColor:"#F44336", color:"white", border:"2px", boxShadow:" 0 10px 20px rgba(0,0,0,0.19)", width:"50%"}}>Log Out</Button>
          </form>
        </div>
      )
    }
    return <div>rien</div>
  }
}

ReactDOM.render(<Application />, document.getElementById("main"));
