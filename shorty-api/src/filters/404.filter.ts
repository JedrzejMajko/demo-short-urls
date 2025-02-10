import {
  ExceptionFilter,
  Catch,
  NotFoundException,
  ArgumentsHost,
} from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import { readFileSync } from 'fs';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

@Catch(NotFoundException)
export class HtmlNotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response: Response = ctx.getResponse<Response>();

    try {
      // Custom HTML 404 template
      const html: string = readFileSync(
        join(__dirname, '../../public/404.html'),
        'utf8',
      ).replace('{{url}}', process.env.SHORTWEB_PROTODOMAIN + '/404');

      response.status(404).send(html);
    } catch {
      // Fallback to basic HTML if template throws an exception
      response.status(404).send(`
        <!DOCTYPE html>
        <html lang="en">
          <head><title>404 Not Found</title></head>
          <body>
            <h1>404 - Page Not Found</h1>
            <p>The requested URL was not found</p>
          </body>
        </html>
      `);
    }
  }
}
