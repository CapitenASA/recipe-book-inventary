import { Test, TestingModule } from '@nestjs/testing';
import { LoginController } from 'src/auth/login.controller';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { PassportModule } from '@nestjs/passport';
// import { HttpModule, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios/dist/http.module';

describe('LoginController', () => {
    let authController: LoginController;
    let authService: AuthService;
    let usersService: UsersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                PassportModule.register({ defaultStrategy: 'jwt' }),
                JwtModule.register({
                    secretOrPrivateKey: 'secretKey',
                    signOptions: {
                        expiresIn: 3600,
                    },
                }),
                HttpModule,
                UsersModule,
            ],
            controllers: [LoginController],
            providers: [AuthService, JwtStrategy, UsersService],
        }).compile();

        authController = module.get<LoginController>(LoginController);
        authService = module.get<AuthService>(AuthService);
        usersService = module.get<UsersService>(UsersService);
    });

    describe('login', () => {
        it('should return a token', async () => {
            const result = await authController.login({
                username: 'mekrizvania@gmail.com',
                password: 'thiasisme',
            });
            expect(result).toBeDefined();
            expect(result.access_token).toBeDefined();
        });

        it('should throw an error if login fails', async () => {
            jest.spyOn(usersService, 'findOne').mockImplementation(() => null);
            try {
                await authController.login({
                    username: 'mekrizvania@gmail.com',
                    password: 'thiasisme',
                });
                fail();
            } catch (error) {
                expect(error).toBeDefined();
                expect(error.message).toBe('Invalid credentials');
            }
        });
    });

    describe('register', () => {
        it('should return a user', async () => {
            const result = await authController.login({
                username: 'mekrizvania@gmail.com',
                password: 'thiasisme',
            });
            expect(result).toBeDefined();
            expect(result.access_token).toBe('test');
        });

        it('should throw an error if registration fails', async () => {
            jest.spyOn(usersService, 'create').mockImplementation(() => null);
            try {
                await authController.login({
                    username: 'test',
                    password: 'testpassword',
                });
                fail();
            } catch (error) {
                expect(error).toBeDefined();
                expect(error.message).toBe('Registration failed');
            }
        });
    });
});
