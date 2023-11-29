import React, { useEffect, useState } from 'react'
import { useGeneralGet } from '../../../hooks/useGeneralGet'
import DelStatus from '../../../Utilities/DelStatus'
import { useGeneralDEL } from '../../../hooks/useGeneralDEL'
import { MdContentPasteOff } from 'react-icons/md'
import { useParams } from 'react-router-dom'
import ButtonClose from '../../../Utilities/ButtonClose'
import { useAuthContext } from '../../../context/AuthContext'
import { currenyFormat } from '../../../Utilities/currencyFormat'
import OrderStatus from '../../../Utilities/OrderStatus'
import Button from '../../../Utilities/Button'
import { useGeneralPATCH } from '../../../hooks/useGeneralPATCH'

const OrderSingleUserDash = () => {
    const {auth} = useAuthContext()
  
    const [orderRes, handleOrderGET] = useGeneralGet()
    const [delStatus, handleOrderItemDEL] = useGeneralDEL() 
    const [loading, error, success, handleConfirmOrderPATCH] = useGeneralPATCH() 
    const [loadingRe, errorRe, successRe, handleReversemOrderPATCH] = useGeneralPATCH() 

    const {id} = useParams()

    useEffect(() => {
       
        handleOrderGET(`order`,id, ``,``,``,``, auth)
        window.scrollTo(0,0)

    }, [delStatus, auth, success, successRe])

    const handleOrderStatus = (orderId) => {
        let body = {'status': 1}
        handleReversemOrderPATCH(`order`, orderId, body, auth)
    }

    const handleOrderReStatus = (orderId) => {
        let body = {'status': 0}
        handleConfirmOrderPATCH(`order`, orderId, body, auth)
    }
  
    return (
        <section className='order__client'>
            <DelStatus delStatus={delStatus} />
        
            <div className="dash-table-box box-shadow">
                <h2>Contact Info</h2>
                <table className="dash-table order-table">
                    <tbody>
                        <tr>
                            <td>User Name</td>
                            <td data-label='User'>{`${(orderRes?.user)}`}</td>
                        </tr>
                        <tr>
                            <td>Order Date</td>
                            <td data-label='Date'>{`${(orderRes?.date)}`}</td>
                        </tr>
                        <tr>
                            <td>Street Address</td>
                            <td data-label='Address'>{`${(orderRes?.street_address)}`}</td>
                        </tr>
                        <tr>
                            <td>District</td>
                            <td data-label='District'>{`${(orderRes?.district)}`}</td>
                        </tr>
                        <tr>
                            <td>Division</td>
                            <td data-label='Division'>{`${(orderRes?.division)}`}</td>
                        </tr>
                        <tr>
                            <td>Payment Method</td>
                            <td data-label='Payment'>{`${(orderRes?.payment_method)}`}</td>
                        </tr>
                        <tr>
                            <td>Payment Status</td>
                            <td data-label='Status'>
                                <OrderStatus status={orderRes?.status} />
                                {
                                    !orderRes?.status &&
                                    <Button 
                                        type="button"
                                        className='secondary-btn order__status-btn'
                                        onClick={() => handleOrderStatus(orderRes?.id)}
                                        loading={loading}
                                    >
                                        Confirm Order
                                    </Button> 
                                }
                                {
                                    orderRes?.status &&
                                    <Button 
                                        type="button"
                                        className='primary-btn order__status-btn'
                                        onClick={() => handleOrderReStatus(orderRes?.id)}
                                        loading={loadingRe}
                                    >
                                        Reverse Order
                                    </Button> 
                                }

                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>


            <div className="dash-table-box box-shadow">
                <h2>Orders</h2>
                <table className='dash-table'>
                    <thead>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Price</th>
                        <th>Delete</th>
                    </thead>
                    <tbody>
                        {
                            orderRes && orderRes.orders ?
                            orderRes.orders.map(item => (
                                <tr key={item.id}>
                                    <td >{item.product}</td>
                                    <td data-label={'Quantity'} >{item.quantity}</td>
                                    <td data-label={'Unit Price'} >{currenyFormat(item.unit_price)}</td>
                                    <td data-label={'Price'} >{currenyFormat(item.price)}</td>
                                    <td data-label='Delete' >
                                        <ButtonClose onClick={() => {handleOrderItemDEL(`single-order`, item.id, auth)}} />
                                    </td>
                                </tr>
                            )) :
                            <tr>
                                <td className='no-item flexcenter' >
                                    <MdContentPasteOff />
                                    <p>No item to show!</p>
                                </td>
                            </tr> 
                        }
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default OrderSingleUserDash