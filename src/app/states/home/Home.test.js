
import React from "react";
import Home from './Home';

import { shallow } from 'enzyme';



describe('<Home/>', () => {

	it('renders without crashing', () => {
	  var comp = shallow(<Home/>);
	  expect(comp).toBeDefined();
	});


});