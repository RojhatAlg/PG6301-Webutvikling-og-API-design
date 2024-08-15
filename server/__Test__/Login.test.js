const jwt = require('jsonwebtoken');
const { login } = require('../Controllers/AuthController');
const users = require('../Models/Users');

jest.mock('jsonwebtoken');

describe('Login Function', () => {
  it('should return a token for valid credentials', () => {
    const req = {
      body: {
        name: 'testuser',
        password: 'password',
      },
    };

    const res = {
      json: jest.fn(),
      status: jest.fn(() => res),
    };

    const mockUser = { id: '1', name: 'testuser', password: 'password', role: 'user' };

    users.find = jest.fn(() => mockUser);
    jwt.sign = jest.fn().mockReturnValue('mock-token');

    login(req, res);
    expect(users.find).toHaveBeenCalled();
    expect(jwt.sign).toHaveBeenCalledWith({ id: mockUser.id, role: mockUser.role }, 'jwt-secret-key', { expiresIn: '90d' });
    expect(res.json).toHaveBeenCalledWith({ token: 'mock-token' });
  });

  it('should return 401 for invalid credentials', () => {
    const req = {
      body: {
        name: 'invaliduser',
        password: 'wrongpassword',
      },
    };

    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };

    users.find = jest.fn(() => undefined);
    
    login(req, res);
    expect(users.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    
    expect(res.send).toHaveBeenCalledWith('Invalid credentials');
  });
});
