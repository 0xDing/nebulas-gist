import React from 'react';
import withRouter from 'umi/withRouter';
import { Spin, Card,Divider } from 'antd';
import AES from "crypto-js/aes";
import ENC from "crypto-js/enc-utf8";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { githubGist } from 'react-syntax-highlighter/styles/hljs';

import {getGist} from '../../utils/request';

class ViewPage extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      path: this.props.location.pathname.replace('/view/',''),
      loading: true,
      data: {}
    }
  }

  componentDidMount() {
   getGist(this.state.path).then((data)=>{
     this.setState({loading: false,data: JSON.parse(data)});
   });
  }

  errorView(msg){
    return(<Card title="Error">
      <h2>Ops... {msg}</h2>
    </Card>);
  }

  CodeView(content){
    return(
      <Card title={this.state.data.title}>
        <div>Version: {this.state.data.version} ・
          Author: <a href={`https://explorer.nebulas.io/#/address/${this.state.data.author}`} target="_blank" rel="noopener noreferrer">{this.state.data.author}</a></div>
        <Divider/>
        <div>
          <SyntaxHighlighter style={githubGist}>{content}</SyntaxHighlighter>
        </div>
      </Card>
    )
  }

  fileView(){
    if (this.state.data.encrypted){
      let pass = prompt("Gist is encrypted. Please input password:","");
      let content = AES.decrypt(this.state.data.content, pass).toString(ENC);
      console.log('2dff',content);
      if (content){
        return this.CodeView(content);
      } else{
        return this.errorView("Wrong Password")
      }
    }else{
      return this.CodeView(this.state.data.content);
    }
  }

  render() {
    return (
      <Spin tip="Loading..." spinning={this.state.loading}>
        {this.state.data == null && this.errorView("Gist does not exist or is still in process.")}
        {!this.state.loading && ('content' in this.state.data) && this.fileView()}
      </Spin>
    );
  }
}

export default withRouter(ViewPage);
