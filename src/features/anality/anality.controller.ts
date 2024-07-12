import { Controller } from '@nestjs/common';
import { AnalityService } from './anality.service';

@Controller('anality')
export class AnalityController {
  constructor(private readonly analityService: AnalityService) {}
}
