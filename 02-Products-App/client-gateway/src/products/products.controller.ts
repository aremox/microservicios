import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PRODUCT_SERVICE } from 'src/config';
import { PaginationDto } from '../common/dto/pagination.dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy
  ) {}

  @Post()
  createProduct(){
    return 'Crear un producto';
  }

  @Get()
  findAllProduct(@Query() paginationDto:PaginationDto){
    return this.productsClient.send({cmd: 'find_all_product'}, paginationDto)
  }

  @Get(':id')
  findOne(@Param('id') id: string){
    return 'Esta funcion regresa el producto ' + id;
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string){
    return 'Esta función elemina el producto ' + id;
  }

  @Patch(':id')
  patchProduct(
    @Param('id') id: string,
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    @Body() body: any){
      console.log(body)
    return 'Esta funcion actualiza el producto ' + id;
  }
}
