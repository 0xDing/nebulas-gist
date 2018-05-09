import React from 'react';
import { Card, Button, Alert } from 'antd';
import { createGist } from "../utils/request";
import Editor from "../components/Editor";
import AES from "crypto-js/aes";
import styles from './index.less';
class IndexPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filename: '',
      ext: 'txt',
      content: '',
      showTips: false
    };
  }

  gistCreate(isSecret){
    let content;
    if (isSecret){
      let pass = prompt("Please input password.","");
      content = AES.encrypt(this.state.content, pass).toString();
      console.log('encryptedData:',content);
    }else{
      content = this.state.content;
    }
    createGist(`${this.state.filename}.${this.state.ext}`,JSON.stringify({
      title: this.state.filename,
      content: content,
      encrypted: isSecret
    }));
    this.setState({showTips: true})
  }

  render(){
    return (
      <div>
        {this.state.showTips && (
          <Alert message={(
            <span><a href={`/view/${this.state.filename}.${this.state.ext}`}>Click here</a> to view after the transaction is complete</span>
          )} type="info" />
        )}
      <Card className={styles.card}>
        <Editor
          onChange={(part,val)=>{
            // eslint-disable-next-line
            switch(part) {
              case 'filename':
                this.setState({filename: val});
                break;
              case 'ext':
                this.setState({ext: val});
                break;
              case 'content':
                this.setState({content: val});
                break;
            }
          }}
        />
        <div className={styles.btns}>
          <Button type="primary" onClick={()=>this.gistCreate(false)} ghost>Create Public Gist</Button>
          <Button type="danger" onClick={()=>this.gistCreate(true)} ghost>Create Secret Gist</Button>
        </div>
      </Card>
      </div>
    );
  }
}

export default IndexPage;
