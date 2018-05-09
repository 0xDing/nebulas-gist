import React from 'react';
import withRouter from 'umi/withRouter';
import Link from 'umi/link';
import { Layout as AntLayout, Button } from 'antd';
const { Header, Footer, Content } = AntLayout;

function Layout({ children, _location }) {
  return(<AntLayout>
    <Header style={{display:'flex', justifyContent:'space-between'}}>
      <Link to="/">
        <img src={require('../assets/logo.svg')} alt="NebulasGist" />
      </Link>
      <Link to="/">
        <Button ghost icon='plus'>Create Gist</Button>
      </Link>
    </Header>
    <Content style={{paddingTop: "1.5rem"}}>
      <div className="container">{children}</div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>
      <i>Share any ascii text in decentralized network.</i> <br/>
      &copy; 2018 <a href="https://boris.tech" target="_blank" rel="noopener noreferrer">Boris Ding</a>. Powered by <a href='https://nebulas.io/' target='_blank' rel="noopener noreferrer">Nebulas</a>.
    </Footer>
  </AntLayout>)
}

export default withRouter(Layout);
