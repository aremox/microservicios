import {
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class ProductosService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('ProductosService');

  onModuleInit() {
    this.$connect();
    this.logger.log('Database connected');
  }
  create(createProductoDto: CreateProductoDto) {
    return this.product.create({
      data: createProductoDto,
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const totalPages = await this.product.count({ where: { available: true } });
    const lastPage = Math.ceil(totalPages / limit);

    return {
      data: await this.product.findMany({
        take: limit,
        skip: (page - 1) * limit,
        where: { available: true },
      }),
      meta: {
        total: totalPages,
        page,
        lastPage,
      },
    };
  }

  async findOne(id: number) {
    const product = await this.product.findFirst({
      where: { id, available: true },
    });

    if (!product) throw new NotFoundException(`Product not found by ${id}`);

    return product;
  }

  async update(id: number, updateProductoDto: UpdateProductoDto) {
    const { id: __, ...data } = updateProductoDto;
    await this.findOne(id);
    return this.product.update({
      where: { id: id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    // return this.product.delete({
    //   where: { id },
    // });

    const product = await this.product.update({
      where: { id },
      data: {
        available: false,
      },
    });
    return product;
  }
}
