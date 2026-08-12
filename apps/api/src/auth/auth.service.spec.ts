import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../database/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ConflictException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let prisma: PrismaService;

  const mockPrisma = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
    student: {
      create: jest.fn(),
    },
    parent: {
      create: jest.fn(),
    },
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: JwtService, useValue: mockJwtService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
    jest.clearAllMocks();
  });

  it('should throw ConflictException if user email already exists', async () => {
    mockPrisma.user.findUnique.mockResolvedValue({ id: '1', email: 'duplicate@test.com' });

    await expect(
      service.register('duplicate@test.com', 'TestPass123', 'Duplicate Test')
    ).rejects.toThrow(
      new ConflictException('An account with this email already exists. Please log in or use a different email.')
    );

    expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: 'duplicate@test.com' },
    });
    expect(mockPrisma.user.create).not.toHaveBeenCalled();
  });
});
