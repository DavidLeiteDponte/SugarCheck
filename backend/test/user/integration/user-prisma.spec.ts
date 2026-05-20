import { UserFactory } from '../fixtures/user.fixture';
import { PrismaUserRepository } from '../../../src/user/infra/PrismaUserRepository/PrismaUserRepository';
import { PrismaService } from '../../../src/shared/infrastructure/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule} from '@nestjs/config';

describe('PrismaUserRepository Integration Tests', () => {
  let prismaService: PrismaService;
  let repository: PrismaUserRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env.test', // Aquí le decimos que use el archivo de test
          isGlobal: true,
        }),
      ],
      providers: [PrismaService],
    }).compile();

    // Obtenemos la instancia ya configurada por Nest
    prismaService = module.get<PrismaService>(PrismaService);

    // Inicializamos manualmente para disparar la conexión
    await prismaService.onModuleInit();

    repository = new PrismaUserRepository(prismaService);
  });

  afterAll(async () => {
    // Es vital cerrar la conexión para que Jest no se quede colgado
    if (prismaService) {
      await prismaService.onModuleDestroy();
    }
  });

  it('create', async () => {
    const user = UserFactory.createInstance();

    // Asumo que save() retorna Promise<void> o Promise<Result<void>>.
    // Si retorna Result, deberías hacer un expect() de su isValid también.
    await repository.save(user);

    const foundUserResult = await repository.getOneById(user.id);

    // 1. Verificamos que el Result sea exitoso antes de extraer la data
    expect(foundUserResult.isValid).toBe(true);

    // 2. Ahora es seguro hacer el getValue()
    const userSearch = foundUserResult.getValue();

    // 3. Validamos sobre la entidad de dominio real
    expect(userSearch.id.value).toBe(user.id.value);
    expect(userSearch.email.value).toBe(user.email.value);

    await repository.delete(user.id);
  });

  it('get all', async () => {
    const user1 = UserFactory.createInstance();
    const user2 = UserFactory.createInstance();

    await repository.save(user1);
    await repository.save(user2);

    const usersResult = await repository.getAll();

    // Verificamos el Result para las listas
    expect(usersResult.isValid).toBe(true);
    const users = usersResult.getValue();

    expect(users.length).toBeGreaterThanOrEqual(2);

    await repository.delete(user1.id);
    await repository.delete(user2.id);
  });

  it('get one by id', async () => {
    const user = UserFactory.createInstance();
    await repository.save(user);

    const userSearchResult = await repository.getOneById(user.id);

    expect(userSearchResult.isValid).toBe(true);
    const userSearch = userSearchResult.getValue();

    expect(userSearch.id.value).toBe(user.id.value);

    await repository.delete(user.id);
  });

  it('delete', async () => {
    const user = UserFactory.createInstance();
    await repository.save(user);

    // Ejecutamos el borrado
    await repository.delete(user.id);

    // Buscamos de nuevo
    const userSearchResult = await repository.getOneById(user.id);

    // IMPORTANTE: En el Result Pattern, si no encuentra el registro,
    // no retorna null, retorna un Result en estado de fallo.
    expect(userSearchResult.isValid).toBe(false);

    // Opcional pero muy recomendado: validar que el error sea el correcto
    // expect(userSearchResult.getError().message).toContain('not found');
  });
});
