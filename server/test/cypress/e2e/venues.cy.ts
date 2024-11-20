//all passing
describe('Venues API Endpoints', () => {
    it('should fetch all venues', () => {
      cy.request('GET', '/venues').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
      });
    });
  });