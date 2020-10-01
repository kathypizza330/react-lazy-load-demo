import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import Body from 'components/Body';
import { Wrapper, Row } from 'components/Table';
import Input from './Input';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class HomePage extends React.PureComponent {
  constructor() {
    super();
    this.state = { data: [], input: "" };
    this.fetchInfo = this.fetchInfo.bind(this);
    this.updateValue = this.updateValue.bind(this);
  }
  // componentDidMount() {

  // }

  fetchInfo = async () => {
    const baseUrl = "https://api.search.nicovideo.jp";
    const path = "/api/v2/video/contents/search";
    const query = new URLSearchParams();
    query.set("q", this.state.input !== '' ? this.state.input : "初音ミク");
    query.set("targets", "title,description,tags");
    query.set("filter", "title,description,tags");
    query.set("fields", "title,description,tags");
    query.set("_sort", "viewCounter");
    query.set("_limit", 10);
    const response = await fetch(`https://cors-anywhere.herokuapp.com/${baseUrl}${path}?${query}`);
    const responseBody = await response.json();
    // console.log('responseBody: ', responseBody);
    this.setState({ data: responseBody.data });
  }

  updateValue = (e) => {
    this.setState({ input: e.target.value });
  }

  renderTable = (data) => {
    let count = 0;
    return (
      <Wrapper>
      {
        data.map(item => {
          console.log(count);
          count++;
          return (
            <Row key={count} index={count}>
              <div>Title: {item.title}</div>
              <div>Description: {item.description}</div>
            </Row>
          )
        })
      }
      </Wrapper>
    )
  }
  
  render() {
    return (
      <Body>
        <div>
          <form>
            <label htmlFor="message">
              <Input id="message" type="text" onChange={this.updateValue} />
            </label>
          </form>
          <button onClick={() => this.fetchInfo()}>
            Search
          </button>
          {this.renderTable(this.state.data)}
        </div>
      </Body>
    );
  }
}

HomePage.propTypes = {
  // onSubmitForm: PropTypes.func,
  // message: PropTypes.string,
  // onChangeInput: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  // loadData: () => dispatch(loadNicoData()),
  // onSubmitForm: evt => {
  //   if (evt !== undefined && evt.preventDefault) evt.preventDefault();
  //   dispatch(sendMessage());
  // },
});

const mapStateToProps = createStructuredSelector({
  // input: makeSelectInput(),
  // message: makeSelectMessage(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
