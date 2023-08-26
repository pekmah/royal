import React from 'react';
import OrderSummary from "./OrderSummary";

const Layout = ({children}) => {
    return (
        <div className={'min-h-screen flex gap-x-6 w-screen pr-14'}>
            {/*main body*/}
            <section className={'w-[70%]'}>
                {children}
            </section>

            {/*Order Summary*/}
            <OrderSummary/>


        </div>
    );
};

export default Layout;