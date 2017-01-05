import { shallow, render, mount  } from 'enzyme';
global.shallow = shallow;
global.render = render;
global.mount = mount;

console.error = message => {
  if (!/(React.createElement: type should not be null)/.test(message)) {
      throw new Error(message);
  }
};
