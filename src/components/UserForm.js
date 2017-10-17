var React = require("react");
var Button = require("react-mdl").Button;
var Textfield = require("react-mdl").Textfield;
var verif = "";

class UserForm extends React.Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {erreur : ""};
  }

  handleChange(event){
    this.setState({[event.target.name] : event.target.value});
  }

  handleSubmit(event){
    event.preventDefault();
    fetch('https://messy.now.sh/join', {
      method: 'POST',
      body: JSON.stringify({
        name: this.state.name,
        password: this.state.password,
        image: this.state.image
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(results =>{
      verif = results.ok;
      console.log("verification dans le render : " + verif);
      if(verif === false){
        this.setState({erreur : <p style={{backgroundColor:"#FF5252", fontWeight:"bold", boxShadow:" 0 10px 20px rgba(0,0,0,0.19)"}}>Login already exists</p>})
      };
      return results.json();
    }).then(data => {
      this.setState({token: data});
      this.props.onUserCreated(data);
    })
  }



render(){

  return (
    <div style={{width:"320px", padding:"10px", textAlign:"center", backgroundColor:"white",  border:"2px", boxShadow:" 0 10px 20px rgba(0,0,0,0.19)"}}>
      {this.state.erreur}
      <h3>Inscription :</h3>
      <form onSubmit={this.handleSubmit}>
        <Textfield required name="name"
          onChange={this.handleChange}
          label="Name..."
          floatingLabel
          style={{width: '200px'}}
        />
        <br />
        <Textfield type="Password" required name="password"
          onChange={this.handleChange}
          label="Password..."
          floatingLabel
          style={{width: '200px'}}
        />
        <br />
        <Textfield type="url" name="image"
          onChange={this.handleChange}
          label="Url image..."
          floatingLabel
          style={{width: '200px'}}
        />
        <br /><br />
        <Button raised ripple>Sign Up</Button>
      </form>
    </div>
  );

}
}

// on l'exporte comme ça (pour qu'un autre fichier puisse le consommer)
module.exports = UserForm;
