import React from 'react';
import { NextPage, GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import { Grid, Box, Typography, Button, Chip } from '@mui/material';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { ProductSlideshow, SizeSelector } from '../../components/products';
import { ItemCounter } from '../../components/ui';
import { IProduct } from '../../interfaces';
import { dbProducts } from '../../database';

interface Props {
   product: IProduct;
}

export const ProductPage:NextPage<Props> = ({ product }) => {

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
                     <Typography variant='subtitle2' sx={{ mb: 1 }}>Cantidad</Typography>
                     <ItemCounter />
                     <Typography variant='subtitle2' sx={{ my: 2 }}>Talle</Typography>
                     <SizeSelector 
                        sizes={product.sizes} 
                     />
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

// ESTA IMPLEMENACION HACE EL QUERY CADA VEZ QUE SE LLAMA LA PAGINA

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//    const { slug = '' } = params as { slug: string };
//    const product = await dbProducts.getProductBySlug(slug);

//    if(!product) {
//       return {
//          redirect: {
//             destination: '/',
//             permanent: false
//          }
//       }
//    }

//    return {
//       props: {
//          product
//       }
//    }
// }


// ESTA IMPLEMENTACION CON GetStaticPaths y GetStaticProps ES MAS EFICIENTE 
// SE HACE AL MOMENTO DE LA COMPILACION

// You should use GetStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths: GetStaticPaths = async (ctx) => {

   const productSlugs = await dbProducts.getAllProductSlugs();

   return {
      paths: productSlugs.map( ({ slug }) => ({
         params: {
            slug
         }
      })),
      fallback: 'blocking'
    }
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async ({ params }) => {
   const { slug = '' } = params as { slug: string };

   const product = await dbProducts.getProductBySlug(slug);
 
      if(!product) { 
         return {
            redirect: {
               destination: '/',
               permanent: false
            }
         }
      }
   
      return {
         props: {
            product
         },
         revalidate: 86400, //60 * 60 * 24 (24 hours)
      }
}

export default ProductPage;



