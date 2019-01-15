//Esta clase es un high order component

import React, { Component } from "react";

export const setPropsAsInitial = WrappedComponent => (
    class extends Component{
        render(){
            return <WrappedComponent {...this.props} 
            initialValues={this.props}
            enableReinitialize/>;//esta ultima propiedad nos permite refrescar la pagina y que vuelva a cargar los datos
        }
    }
);