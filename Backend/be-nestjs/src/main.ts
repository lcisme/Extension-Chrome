import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    {
      bufferLogs: true,
      cors: true,
    },
  );

  app.enable('trust proxy');

  const config = new DocumentBuilder()
    .setTitle('EXTENSION CHROME')
    .setVersion('1.0')
    .addTag('example')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  console.log(`🟢listening at ${process.env.PORT})} 🟢\n`);
  await app.listen(process.env.PORT);
}
bootstrap();
