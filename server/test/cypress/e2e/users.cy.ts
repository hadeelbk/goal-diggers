describe('Users API Endpoints', () => {
    let userId: string;
  
    //passed 
    it('should create a new user', () => {
      const newUser = {
        userName: 'TestUser',
        password: 'password123',
        email: 'testuser@example.com',
        firstName: 'Test',
        lastName: 'User',
        dateOfBirth: '1990-01-01',
        position: 'Player',
      };
  
      cy.request('POST', '/users', newUser).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('_id');
        userId = response.body._id;
      });
    });
  
    //passed
    it('should fetch all users', () => {
      cy.request('GET', '/users').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
      });
    });
  
    it('should fetch a user by ID', () => {
      cy.request('GET', `/users/${userId}`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body._id).to.eq(userId);
      });
    });
  
    it('should log in with valid credentials', () => {
      cy.request('POST', '/login', {
        usernameOrEmail: 'TestUser',
        password: 'password123',
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('userId', userId);
      });
    });
  
    //passed
    it('should return an error for invalid credentials', () => {
      cy.request({
        method: 'POST',
        url: '/login',
        body: { usernameOrEmail: 'NonExistentUser', password: 'wrongpassword' },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
      });
    });
  });