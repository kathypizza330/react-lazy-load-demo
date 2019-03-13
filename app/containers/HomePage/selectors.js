/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = state => state.get('home', initialState);

const makeSelectInput = () =>
  createSelector(selectHome, homeState => homeState.get('input'));

const makeSelectMessage = () =>
  createSelector(selectHome, homeState => homeState.get('message'));

export { makeSelectInput, makeSelectMessage };
