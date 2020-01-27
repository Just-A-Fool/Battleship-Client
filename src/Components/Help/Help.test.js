import React from 'react';
import ReactDOM from 'react-dom';
import Help from './Help';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { BrowserRouter as Router } from 'react-router-dom';


describe('Help component', () => {
  it('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Router><Help /></Router>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Displays the Help component when rendered', () => {
    const wrapper = mount(<Router><Help /></Router>)
    expect(toJson(wrapper)).toMatchSnapshot()
  });

});