import { Controller } from '@nestjs/common';
import { DetailOrdersService } from './detail-orders.service';

@Controller('detail-orders')
export class DetailOrdersController {
  constructor(private readonly detailOrdersService: DetailOrdersService) {}
}
