import { Grid, Box, Typography, Button, Chip } from '@mui/material';
import React from 'react';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { ProductSlideshow } from '../../components/products';
import { initialData } from '../../database/products';

const product = initialData.products[0];

export const ProductPage = () => {
   return (
      <ShopLayout title={product.title} pageDescription={product.description}>
         <Grid container spacing={3}>
            <Grid item xs={12} sm={7}>
               <ProductSlideshow 
                  images={product.images}
               />
            </Grid>

            <Grid item xs={12} sm={5}>
               <Box display='flex' flexDirection='column'>
                  <Typography variant='h1' component='h1'>
                     {product.title}
                  </Typography>
                  <Typography variant='subtitle1' component='h2'>
                     ${product.price}
                  </Typography>

                  <Box sx={{ my: 2 }}>
                     <Typography variant='subtitle2'>Cantidad</Typography>
                  </Box>

                  {/* Agregar al carrito */}
                  <Button color='secondary' className='circular-btn'>
                     Agregar al carrito
                  </Button>

                  {/* <Chip label='No hay disponibles' color='error' variant='outlined' /> */}

                  {/* Descripcion */}
                  <Box sx={{ mt: 3 }}>
                    <Typography variant='subtitle2'>Descripción</Typography>
                    <Typography variant='body2'>{product.description}</Typography>
                  </Box>

               </Box>
            </Grid>
         </Grid>
      </ShopLayout>
   );
};

export default ProductPage;
