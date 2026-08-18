import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtAuthGuard],
    }).compile();

    guard = module.get<JwtAuthGuard>(JwtAuthGuard);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should extend AuthGuard("jwt")', () => {
    expect(guard).toBeInstanceOf(AuthGuard('jwt'));
  });

  const mockContext = {} as ExecutionContext;

  it('should throw UnauthorizedException when no token is provided', () => {
    // Simulate passport-jwt rejecting with no token (err=null, user=false)
    expect(() => guard.handleRequest(null, false, null, mockContext)).toThrow(UnauthorizedException);
  });

  it('should throw UnauthorizedException when token is invalid/malformed', () => {
    // Simulate passport-jwt rejecting with a JsonWebTokenError
    const jwtError = new Error('invalid token');
    jwtError.name = 'JsonWebTokenError';
    expect(() => guard.handleRequest(null, false, jwtError, mockContext)).toThrow(UnauthorizedException);
  });

  it('should return user when valid token is provided', () => {
    const mockUser = { userId: 'abc123', email: 'test@example.com', role: 'STUDENT' };
    const result = guard.handleRequest(null, mockUser, null, mockContext);
    expect(result).toEqual(mockUser);
  });
});
