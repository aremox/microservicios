import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor() {}

  @Post()
  createProduct(){
    return 'Crear un producto';
  }

  @Get()
  findAllProduct(){
    return 'Devuelve todos los productos'
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
