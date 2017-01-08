import { shallow, render, mount  } from 'enzyme';
global.shallow = shallow;
global.render = render;
global.mount = mount;

const mockResponse = (status, statusText, response) => {
  return new window.Response(response, {
      status: status,
      statusText: statusText,
      headers: {
            'Content-type': 'application/json'
          }
    });
};

console.error = message => {
  if (!/(React.createElement: type should not be null)/.test(message)) {
      throw new Error(message);
  }
};
