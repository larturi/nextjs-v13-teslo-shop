import type { NextPage, GetServerSideProps } from 'next';
import { Box, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';
import { IProduct } from '../../interfaces/products';
import { dbProducts } from '../../database';

interface Props {
    products: IProduct[];
    productsExists: boolean;
    query: string;
}

const SearchPage: NextPage<Props> = ({ products, productsExists, query }) => {

  return (
    <ShopLayout title={'Teslo-Shop: Search'} pageDescription={'Encuentra los productos que buscas en Teslo-Shop!'}>
      <Typography variant='h1' component='h1'>Buscar productos</Typography>

      {
        productsExists
        ? <Typography variant='h2' sx={{ mb: 1, mt: 2 }} textTransform="capitalize">Término: {query}</Typography>
        : <Box display="flex">
            <Typography variant='h2' sx={{ mb: 3 }}>No encontramos ningún producto con el término: </Typography>
            <Typography variant='h2' sx={{ mb: 3, ml: 1 }} color='secondary'>{query}</Typography>
          </Box>

      }
      <ProductList products={ products } />
    </ShopLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    
    const { query = '' } = params as { query: string };

    if ( query.length === 0 ) {
        return {
            redirect: {
                destination: '/',
                permanent: true
            }
        }
    }

    let products = await dbProducts.getProductsByTerm( query );
    const foundProducts = products.length > 0;

    if ( !foundProducts ) {
        products = await dbProducts.getProductsByTerm('shirt');
    }

    return {
        props: {
            products,
            foundProducts,
            query
        }
    }
}

export default SearchPage;