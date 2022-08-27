import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import NextLink from 'next/link';
import { Chip, Grid, Typography, Link } from '@mui/material';
import { DataGrid, GridColDef, GridToolbar, GridValueGetterParams } from '@mui/x-data-grid';
import { ShopLayout } from '../../components/layouts';
import { getSession } from 'next-auth/react';
import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'fullName', headerName: 'Nombre y Apellido', width: 300 },
    {
        field: 'paid', 
        headerName: 'Pago realizado',
        description: 'Puede demorar hasta 24 horas en acreditarse el pago realizado',
        width: 160,
        renderCell: (params: GridValueGetterParams) => {
            return (
                params.row.paid ?
                <Chip color='success' label='Pago realizado' variant='outlined' /> :
                <Chip color='error' label='Pago pendiente' variant='outlined' /> 
            )
        }
    },
    { 
        field: 'orden', 
        headerName: 'Ver Orden', 
        width: 300,
        sortable: false,
        renderCell: (params: GridValueGetterParams) => {
            return (
                <NextLink href={`/orders/${params.row.orderId}`} passHref>
                    <Link underline='always'>
                       Ver Orden
                    </Link>
                </NextLink>
            )
        }
    },
];
interface Props {
    orders: IOrder[]
}

const HistoryPage: NextPage<Props> = ({ orders }) => {

    console.log(orders)

  const rows: any = [];

  orders.forEach((order, index) => {
     rows.push({
        id: index + 1,
        orderId: order._id,
        paid: order.isPaid,
        fullName: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
     })
  });

  return (
    <ShopLayout title='Historial de Ordenes' pageDescription='Historial de Ordenes'>
        <Typography variant='h1' component='h1' sx={{ mb:2 }}>Historial de Ordenes</Typography>

        <Grid container className='fadeIn'>
            <Grid item xs={12} sx={{ height: 650, width: '100%'}}>

                <DataGrid 
                    components={{ Toolbar: GridToolbar }}
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    hideFooterSelectedRowCount={true}
                    disableSelectionOnClick={true}
                />

            </Grid>
        </Grid>
    </ShopLayout>
  )
}



export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    
    const session: any = await getSession({req});

    if(!session) {
        return {
            redirect: {
                destination: '/auth/login?p=/orders/history',
                permanent: false,
            }
        }
    }

    const orders = await dbOrders.getOrdersByUser(session.user._id);

    return {
        props: {
            id: session.user._id,
            orders
        }
    }
}

export default HistoryPage;