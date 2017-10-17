var DeleteMessageUser = require("./DeleteMessageUser");
var React = require("react");
var DataTable = require("react-mdl").DataTable;
var TableHeader = require("react-mdl").TableHeader;


class GetMessageUser extends React.Component {
  constructor(props){
    super(props);
    this.state = {messages: []};

  }

  componentDidMount(){
    console.log("test");
    fetch('https://messy.now.sh/u/timeline', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer:${this.props.token}`
      }
    }).then(results =>{
      return results.json();
    }).then(data => {
      this.setState({messages: data});
      var t = setTimeout(this.componentDidMount.bind(this), 5000);
    })
  }



render(){
  let messages = this.state.messages.map((message) => {
    sessionStorage.setItem('idUserMessage', message.user_id);
    return(
        {
          image: <img src={message.user.image} height="50" width="50"/>,
          pseudo: <div style={{textAlign:"center"}}>{message.user.name}</div>,
          message: <div style={{textAlign:"left"}}>{message.message}</div>,
          DELETE:<DeleteMessageUser idUser={this.props.idUser} idUserMessage={sessionStorage.getItem('idUserMessage')} idMessage={message.id} token={this.props.token}/>
        }
    )
  });

  return (
        <div style={{display:"flex", overflowY: "scroll", width:"98%", padding:"10px", height: "500px",  border:"5px", boxShadow:" 0 10px 20px rgba(0,0,0,0.19)"}}>
        <DataTable shadow={0} style={{width:"100%"}} rows={messages}>
          <TableHeader style={{width:"1%", textAlign:"center", backgroundColor:"white", fontSize:"large"}} name="image">Image</TableHeader>
          <TableHeader style={{width:"15%", textAlign:"center", backgroundColor:"#EEEEEE", fontSize:"large"}} numeric name="pseudo">Pseudo</TableHeader>
          <TableHeader style={{width:"74%", maxWidth:"74%", textAlign:"center", backgroundColor:"white", fontSize:"large"}} numeric name="message">Message</TableHeader>
          <TableHeader style={{width:"1%", textAlign:"center", backgroundColor:"#EEEEEE", fontSize:"large"}} name="DELETE">Delete</TableHeader>
        </DataTable>
        </div>
  );

}
}

// on l'exporte comme ça (pour qu'un autre fichier puisse le consommer)
module.exports = GetMessageUser;
