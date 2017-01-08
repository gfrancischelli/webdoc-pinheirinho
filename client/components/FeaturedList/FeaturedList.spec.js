import React from 'react';
import FeaturedList from './FeaturedList';

const mock_data =[{
    heroUrl: 'dummy hero',
    title: 'dummy title',
    content: 'dummy content'
  },{
    heroUrl: 'dummy hero',
    title: 'dummy title',
    content: 'dummy content'
  },{
    heroUrl: 'dummy hero',
    title: 'dummy title',
    content: 'dummy content'
}];

it('FeaturedList renders correctly', () => {
  const wrapper = shallow(
    <FeaturedList featured={mock_data} />
  )
  expect(wrapper).toMatchSnapshot();
});
