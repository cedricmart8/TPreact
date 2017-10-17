var React = require("react");
var Textfield = require("react-mdl").Textfield;
var Button = require("react-mdl").Button;

class GetMessageUser extends React.Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({[event.target.name] : event.target.value});
    console.log(event.target.name, event.target.value);
  }

  handleSubmit(event){
    event.preventDefault();
    fetch('https://messy.now.sh/u/timeline', {
      method: 'POST',
      body: JSON.stringify({
        message: this.state.message
      }),
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer:${this.props.token}`
      }
    })
  }



render(){

  return (
    <div style={{padding:"10px", border:"2px", backgroundColor:"white", boxShadow:" 0 10px 20px rgba(0,0,0,0.19)", width:"60%"}}>
      <form onSubmit={this.handleSubmit}>
        <h3> Votre message</h3>
        <Textfield name="message"
          onChange={this.handleChange}
          label="Enter your message..."
          rows={1}
          style={{width: '100%'}}
        />
        <div style={{textAlign:"center"}}>
          <Button raised ripple style={{backgroundColor:"#4CAF50"}}> Send </Button>
        </div>
      </form>
    </div>
  );

}
}

// on l'exporte comme ça (pour qu'un autre fichier puisse le consommer)
module.exports = GetMessageUser;
