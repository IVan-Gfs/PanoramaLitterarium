import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

 
  (BigInt.prototype as any).toJSON = function () { //converte todos os tipos BigInt em Int normal
    return Number(this); 
  };

  app.enableCors({
    origin: ['http://localhost:5173'],
    methods: 'GET, HEAD, PUT POST, DELETE, PATCH',
    credentials: true,
  })

 

  const port = process.env.PORT ?? 8000;
  await app.listen(port);
  
  console.log(`Aplicação rodando em: http://localhost:${port}`);
}

bootstrap();