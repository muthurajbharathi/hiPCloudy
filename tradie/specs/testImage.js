describe('Go to upload image', () => {
  let data;
  beforeAll(() => {
    console.log('here in save image..------');
  });
  it('save image'), () => {
    console.log('here in save image..------');
    data = new Buffer('Hello World').toString('base64');
    browser.pushFile('/Users/jaspreet/Desktop/poppeye.jpg', data);
 };
 it('move to Hired subtab', () => {
    console.log('here in save image..------');
 };
});

