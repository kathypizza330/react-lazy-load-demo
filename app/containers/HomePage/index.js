import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import Body from 'components/Body';
import Input from './Input';
import { sendMessage } from '../App/actions';
import { changeInput } from './actions';
import { makeSelectInput, makeSelectMessage } from './selectors';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class HomePage extends React.PureComponent {
  render() {
    const { message, onSubmitForm, onChangeInput } = this.props;

    return (
      <Body>
        <div>
          <h2>From websocket</h2>
          <p>{message}</p>
        </div>
        <div>
          <h2>Send a message</h2>
          <form onSubmit={onSubmitForm}>
            <label htmlFor="message">
              <Input id="message" type="text" onChange={onChangeInput} />
            </label>
          </form>
        </div>
      </Body>
    );
  }
}

HomePage.propTypes = {
  onSubmitForm: PropTypes.func,
  message: PropTypes.string,
  onChangeInput: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  onChangeInput: evt => dispatch(changeInput(evt.target.value)),
  onSubmitForm: evt => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    dispatch(sendMessage());
  },
});

const mapStateToProps = createStructuredSelector({
  input: makeSelectInput(),
  message: makeSelectMessage(),
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
