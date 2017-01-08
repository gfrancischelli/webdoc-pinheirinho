import React from 'react';
import ImageSet from './ImageSet';

it('should render correctly', () => {
  const wrapper = shallow(
    <ImageSet url=''>
      <img />
    </ImageSet>
  )
  expect(wrapper).toMatchSnapshot();
})
