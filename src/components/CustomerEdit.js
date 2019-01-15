import React, { Component } from 'react';
import PropTypes from 'prop-types';
import  CustomersActions  from './CustomersActions';
import { setPropsAsInitial } from '../Helpers/setPropsAsInitial';
import { accessControl } from './../Helpers/accessControl';
import { reduxForm, Field } from 'redux-form';
import { Prompt } from 'react-router-dom';
import { CUSTOMER_EDIT } from './../Constants/permissions'; 


const isRequired = value => (       //esta es una validacion a nivel de field, logra lo mismo que una global
    !value && "Este campo es requerido"
);



const isNumber = value => (
    isNaN(Number(value)) && "El campo debe ser numerico"
);

const validate = values => {    //esta es una validacion a nivole global, la usaremos en name por ahora,
    //la validacion de dni no se usara aqui porque se hara a nivel de Field, para ver los dos metodos de validar datos
    //Las validaciones a nivel de field se interponen a las de nivel global
    const error = {};
    if (!values.name)
    {
        error.name = "Nombre requerido";
    }
    /*
    if(!values.dni)
    {
        error.dni = "DNI requerido";
    }*/
    //comentamos esta ultima parte del codigo para ver como se hacen los dos tipos de validaciones de campos,
    //la validacion del dni se hara por field
    return error;
};

const toNumber = value => value && Number(value);

/*const onlyGrow = (value, previousValue, values)  => 
    value && previousValue && (value > previousValue ? value : previousValue); validacion de los datos */
//convertimos este componente a clase para ver unas funciones de componentes no controlados, como enfocar un 
//cuadro de texto el principio de la carga de la pagina
class CustomerEdit extends Component {
    
    componentDidMount(){
        if(this.txt){
            this.txt.focus();
        }
    }

    renderField = ({input, meta, type, label, name, withFocus}) => (
        <div>
            <label htmlFor={name}>{label}</label>
            <input {...input} 
            type={!type ? "text": type}
            ref={withFocus && (txt => this.txt = txt)}/>
            {
                meta.touched && meta.error && <span>{meta.error}</span>
            }
        </div>
    );

    render(){
        const {handleSubmit, submitting, onBack, pristine, submitSucceeded} = this.props;
        return (
            <div>
                <h2>Edicion del cliente</h2>
                    <form onSubmit={handleSubmit}>
                        <Field 
                            withFocus={true}//se puede omitir el igual true e igual se inicializa como true
                            //yo lo dejare como = true para entenderlo mejor despues
                            name="name" 
                            component={this.renderField}
                            type="text"
                            label="Nombre">                    
                        </Field>
                        <Field 
                            name="dni" 
                            component={this.renderField}
                            type="text"                        
                            label="DNI"
                            validate={isRequired}>
                        </Field>
                        <Field 
                            name="age" 
                            //component="input" dejaremos esto comentado para ver cuando no tiene un objeto como componente 
                            component={this.renderField}
                            type="number"
                            validate={isNumber}
                            label="Age"
                            parse={toNumber}/*llama a la funcion para convertir a numero a la hora de procesarlo*/
                            //format={toUpper} convierte la funcion para cambiar el texto antes de mostrarlo
                            //normalize={onlyGrow}
                            >                                  
                        </Field>
                        <CustomersActions>
                            <button type="submit" disabled={pristine || submitting}>Aceptar</button>
                            <button type="button" onClick={onBack} disabled={submitting}>Cancelar</button>  
                        </CustomersActions>
                        <Prompt 
                            when={!pristine && !submitSucceeded}    //valida si se realiza algun cambio en el form
                            //el boton de cancelar debe ser de tipo button y no submit para que se puede diferenciar
                            message="Se perderan los datos si continua">
                        </Prompt>
                    </form>
            </div>
        );
    }
}

CustomerEdit.propTypes = {
    name: PropTypes.string,
    dni: PropTypes.string,
    age: PropTypes.number,
    onBack: PropTypes.func.isRequired,
};

const CustomerEditForm = reduxForm(
    { 
        form: 'CustomerEdit',
        validate
    })(CustomerEdit);

export default accessControl([CUSTOMER_EDIT])(setPropsAsInitial(CustomerEditForm));