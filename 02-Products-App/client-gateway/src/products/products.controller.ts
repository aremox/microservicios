import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PRODUCT_SERVICE } from 'src/config';
import { PaginationDto } from '../common/dto/pagination.dto';
import { catchError } from 'rxjs';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy
  ) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductoDto){
    return this.productsClient.send({cmd: 'create_product'}, createProductDto)
  }

  @Get()
  findAllProduct(@Query() paginationDto:PaginationDto){
    return this.productsClient.send({cmd: 'find_all_product'}, paginationDto)
  }

  @Get(':id')
  async findOne(@Param('id') id: string){

    return this.productsClient.send({cmd: 'find_one_product'}, {id})
    .pipe(
      catchError( err =>{ throw new RpcException(err)})
    );

    // try {
    //   const product = await firstValueFrom(
    //     this.productsClient.send({cmd: 'find_one_product'}, {id})
    //   )
    //   return product;
    // } catch (error) {
    //   throw new RpcException(error)
    // }
  }

  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) id: number,){
    return this.productsClient.send({cmd: 'delete_product'}, {id})
  }

  @Patch(':id')
  patchProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductoDto: UpdateProductoDto
  ){
    return this.productsClient.send({cmd: 'update_product'}, {
      id,
      ...updateProductoDto
    }).pipe(
      catchError( err => {throw new RpcException(err)})
    )
  }
}
