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
  cat: string;
}

@Controller({ host: 'admin.example.com' }) // Requests made from this host will use the AdminController class
export class AdminController {
  @Get()
  index(): string {
    return 'Admin page';
  }
}

@Controller('cats') // Basic controller
export class CatsController {
  @Get() // Tells Nest to create a handler for a specific endpoint for HTTP Requests. GET /cats
  helloWorld(): string {
    return 'Hello cats';
  }

  @Get('all')
  findAll(@Res({ passthrough: true }) res: Response) {
    res.status(HttpStatus.OK);
    return [];
  }

  @Get('bye')
  @HttpCode(418) // Indicate specific httpCode
  byeWorld(): string {
    return 'Bye cats';
  }

  @Get('type')
  getCountry(@Query(ValidationPipe) query: CountryParameters): string {
    // npm i class-validator class-transformer to use ValidationPipe
    const { cat } = query;

    // As we are doing a cats app, we will not check if we indeed have a cat in req.query
    return cat ?? 'No cat sent';
  }

  @Get('destroy')
  @Redirect('https://nestjs.com', 301)
  getDestroy() {}

  @Get(':id')
  findOne(@Param() params: { id: number }): string {
    return `This action returns a #${params.id} cat`;
  }

  @Post()
  @Header('Cache-Control', 'none')
  create() {
    return 'This action adds a new cat';
  }
}
