import React from 'react';
import { Provider } from 'react-redux';
import store from './Store/Store';
import CoustomerList from './Component/CoustomerList';

function CustomerManagementApp() {
    return (
        <Provider store={store}>
            <div >
                <CoustomerList/>
            </div>
        </Provider>
    );
}

export default CustomerManagementApp;
