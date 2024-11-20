describe('Games API Endpoints', () => {
    let gameId: string;
  
    it('should create a new game', () => {
      const newGame = {
        venue: 'Test Venue',
        date: '2024-01-01',
        players_needed: 10,
        game_type: 'Soccer',
        duration: 90,
        price_per_head: 5,
        contact_details: 'contact@example.com',
      };
  
      cy.request('POST', '/games', newGame).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('_id');
        gameId = response.body._id;
      });
    });
  
    //passed
    it('should fetch all games', () => {
      cy.request('GET', '/games').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
      });
    });
  
    it('should fetch a game by ID', () => {
      cy.request('GET', `/games/${gameId}`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body._id).to.eq(gameId);
      });
    });
  
    it('should let a user join a game', () => {
      cy.request('PUT', `/games/${gameId}`, { userName: 'TestUser' }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.players).to.deep.include({ userName: 'TestUser' });
        
      });
    });
  
    it('should return an error for a non-existent game', () => {
      cy.request({
        method: 'GET',
        url: '/games/invalidGameId',
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(404);
      });
    });
  });