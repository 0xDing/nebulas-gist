import React from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
import {Input, Select, Form} from 'antd';
import 'brace';
import 'brace/ext/language_tools';
import 'brace/ext/beautify';
import 'brace/mode/css';
import 'brace/mode/c_cpp';
import 'brace/mode/clojure';
import 'brace/mode/dockerfile';
import 'brace/mode/elixir';
import 'brace/mode/erlang';
import 'brace/mode/golang';
import 'brace/mode/html';
import 'brace/mode/java';
import 'brace/mode/javascript';
import 'brace/mode/json';
import 'brace/mode/jsx';
import 'brace/mode/less';
import 'brace/mode/lua';
import 'brace/mode/markdown';
import 'brace/mode/python';
import 'brace/mode/php';
import 'brace/mode/perl';
import 'brace/mode/r';
import 'brace/mode/ruby';
import 'brace/mode/rust';
import 'brace/mode/sql';
import 'brace/mode/scala';
import 'brace/mode/scss';
import 'brace/mode/sh';
import 'brace/mode/swift';
import 'brace/mode/typescript';
import 'brace/mode/text';
import 'brace/mode/xml';
import 'brace/mode/yaml';
import 'brace/theme/sqlserver';

const Option = Select.Option;
const FormItem = Form.Item;

const extMap = [
  {mode: 'css', ext: 'css'},
  {mode: 'c_cpp', ext: 'c'},
  {mode: 'clojure', ext: 'clj'},
  {mode: 'dockerfile', ext: 'Dockerfile'},
  {mode: 'elixir', ext: 'exs'},
  {mode: 'erlang', ext: 'el'},
  {mode: 'golang', ext: 'go'},
  {mode: 'html', ext: 'html'},
  {mode: 'java', ext: 'java'},
  {mode: 'javascript', ext: 'js'},
  {mode: 'json', ext: 'json'},
  {mode: 'jsx', ext: 'jsx'},
  {mode: 'lua', ext: 'lua'},
  {mode: 'markdown', ext: 'md'},
  {mode: 'python', ext: 'py'},
  {mode: 'php', ext: 'php'},
  {mode: 'json', ext: 'json'},
  {mode: 'perl', ext: 'pl'},
  {mode: 'r', ext: 'r'},
  {mode: 'ruby', ext: 'rb'},
  {mode: 'rust', ext: 'rs'},
  {mode: 'sql', ext: 'sql'},
  {mode: 'scala', ext: 'scala'},
  {mode: 'scss', ext: 'scss'},
  {mode: 'sh', ext: 'sh'},
  {mode: 'text', ext: 'txt'},
  {mode: 'swift', ext: 'swift'},
  {mode: 'typescript', ext: 'ts'},
  {mode: 'xml', ext: 'xml'}
];

class Editor extends React.Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired
  };



  constructor(props) {
    super(props);
    this.state = {
      ext: 'js',
      content: ''
    };
  }

  extSelect() {
    const children = [];
    extMap.map(x => children.push(<Option value={x.ext} key={x.ext}>.{x.ext}</Option>));
    return (
      <Select
        onChange={(val) => {
          this.setState({ext: val});
          this.props.onChange('ext', val);
        }}
        defaultValue={this.state.ext} style={{width: 80}} showSearch>
        {children}
      </Select>
    );
  }

  render() {
    return (
      <div className="ant-form ant-form-horizontal">
        <FormItem>
          <Input
            onChange={(e) => this.props.onChange('filename', e.target.value)}
            placeholder="Filename"
            addonAfter={this.extSelect()}/>
        </FormItem>
        <FormItem>
          <AceEditor
            className="ant-input"
            mode={extMap.find((obj) => obj.ext === this.state.ext).mode}
            theme="sqlserver"
            name="source_editor"
            wrapEnabled={true}
            enableBasicAutocompletion={true}
            enableLiveAutocompletion={true}
            highlightActiveLine={false}
            showPrintMargin={false}
            width='100%'
            height='60vh'
            onChange={(val)=>{
              this.setState({content: val});
              this.props.onChange('content',val)
            }}
            value={this.state.content}
            editorProps={{
              enableSnippets: true,
              highlightGutterLine: false,
            }}
          />
        </FormItem>
      </div>
    );
  };
}

export default Editor;
