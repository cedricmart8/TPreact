var React = require("react");
var Button = require("react-mdl").Button;

class DeleteMessageUser extends React.Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();
    fetch(`https://messy.now.sh/u/timeline/${this.props.idMessage}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer:${this.props.token}`
      }
    })
  }



render(){
  if (this.props.idUser == this.props.idUserMessage){
  	return(
      <form onSubmit={this.handleSubmit}>
        <Button raised ripple style={{backgroundColor:"#F44336", color:"white", border:"2px", boxShadow:" 0 10px 20px rgba(0,0,0,0.19)"}}>DELETE</Button>
      </form>
    );
  }
  else {
    return (<p/>);
  }
  }
}

// on l'exporte comme ça (pour qu'un autre fichier puisse le consommer)
module.exports = DeleteMessageUser;
