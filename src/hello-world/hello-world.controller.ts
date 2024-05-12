import {
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Redirect,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';

interface CountryParameters {
  country: string;
}

@Controller({ host: 'admin.example.com' }) // Requests made from this host will use the AdminController class
export class AdminController {
  @Get()
  index(): string {
    return 'Admin page';
  }
}

@Controller('hello-world') // Basic controller
export class HelloWorldController {
  @Get() // Tells Nest to create a handler for a specific endpoint for HTTP Requests. GET /hello-world
  helloWorld(): string {
    return 'Hello World';
  }

  @Get('all')
  findAll(@Res({ passthrough: true }) res: Response) {
    res.status(HttpStatus.OK);
    return [];
  }

  @Get('bye')
  @HttpCode(418) // Indicate specific httpCode
  byeWorld(): string {
    return 'Bye World';
  }

  @Get('time')
  getActualTime(): string {
    return 'This should return the actual time but instead it returns this beautifull text';
  }

  @Get('country')
  getCountry(@Query(ValidationPipe) query: CountryParameters): string {
    // npm i class-validator class-transformer to use ValidationPipe
    const { country } = query;

    // As we are doing a hello-world app, we will not check if we indeed have a country in req.query
    return country ?? 'No country sent';
  }

  @Get('destroy')
  @Redirect('https://nestjs.com', 301)
  getDestroy() {}

  @Get(':id')
  findOne(@Param() params: { id: number }): string {
    return `This action returns a #${params.id} world`;
  }

  @Post()
  @Header('Cache-Control', 'none')
  create() {
    return 'This action adds a new world';
  }
}
