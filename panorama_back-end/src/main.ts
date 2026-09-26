import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser = require('cookie-parser');


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser()); 
  (BigInt.prototype as any).toJSON = function () { //converte todos os tipos BigInt em Int normal
    return Number(this); 
  };

 
  app.enableCors({
  origin: [
    'http://localhost:5173',        
    'http://192.168.2.109:5173',
    'http://10.38.253.233:5173',     
  ],
  methods: 'GET, HEAD, PUT, POST, DELETE, PATCH',
  credentials: true,
});

  //ativa o classtransform
 app.useGlobalPipes(new ValidationPipe({ 
  transform: true, 
  whitelist: true,
}));

  const port = process.env.PORT ?? 8000;
  await app.listen(port, '0.0.0.0');
  
  console.log(`Aplicação rodando em: http://localhost:${port}`);
}

bootstrap();